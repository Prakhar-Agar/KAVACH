/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kavach Shared In-Memory Evidence & Context State
 * 
 * PRIVACY RULES:
 * 1. STRICTLY IN-MEMORY: No localStorage, sessionStorage, IndexedDB, or cookies.
 * 2. Survives in-app client navigation between /preserve, /report, and /respond.
 * 3. Enforces beforeunload warning when unexported evidence items exist.
 */

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export interface EvidenceItem {
  id: string;
  file?: File;
  fileName: string;
  excludeFileName: boolean;
  fileSizeBytes: number;
  mimeType: string;
  sha256: string;
  hashedAtUtc: string;
  hashedAtLocal: string;
  fileLastModified: string;
  originalCapturedAt: string;
  sourceType: 'screenshot' | 'chat' | 'web' | 'other';
  sourceReference: string;
  excludeSourceRef: boolean;
  note: string;
  includeNote: boolean;
  previewUrl: string | null;
  isPreviewVisible: boolean;
  isUnblurred: boolean;
}

export interface ExternalManifestEntry {
  evidenceId: string;
  fileName?: string;
  fileSizeBytes?: number;
  mimeType?: string;
  sha256: string;
  hashedAtUtc?: string;
  originalCapturedAt?: string;
  sourceType?: string;
  sourceReference?: string;
  note?: string;
}

export interface ExternalManifest {
  manifestVersion?: string;
  tool?: string;
  generatedAtUtc?: string;
  incidentReference?: string;
  entries: ExternalManifestEntry[];
  manifestHash?: string;
}

interface EvidenceContextType {
  items: EvidenceItem[];
  setItems: React.Dispatch<React.SetStateAction<EvidenceItem[]>>;
  addItem: (item: EvidenceItem) => void;
  addItems: (newItems: EvidenceItem[]) => void;
  removeItem: (id: string) => void;
  updateItemField: <K extends keyof EvidenceItem>(id: string, field: K, value: EvidenceItem[K]) => void;
  clearItems: () => void;
  incidentCategory: string | null;
  setIncidentCategory: (category: string | null) => void;
}

const EvidenceContext = createContext<EvidenceContextType | undefined>(undefined);

export const EvidenceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useLanguage();
  const [items, setItems] = useState<EvidenceItem[]>([]);
  const [incidentCategory, setIncidentCategory] = useState<string | null>(null);
  const objectUrlsRef = useRef<Set<string>>(new Set());

  // Warn if user attempts to close or refresh browser window while evidence is held in memory
  // Quick Exit MUST NEVER be blocked: if __KAVACH_SUPPRESS_BEFOREUNLOAD is set, exit immediately
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if ((window as any).__KAVACH_SUPPRESS_BEFOREUNLOAD) {
        return;
      }
      if (items.length > 0) {
        e.preventDefault();
        e.returnValue = t.preserveUnsavedLeaveWarning;
        return t.preserveUnsavedLeaveWarning;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [items.length, t.preserveUnsavedLeaveWarning]);

  // Listen for clear all data and quick exit events
  useEffect(() => {
    const handleClear = () => {
      clearItems();
      setIncidentCategory(null);
    };

    window.addEventListener('kavach:clear-all-data', handleClear);
    window.addEventListener('kavach:quick-exit', handleClear);
    return () => {
      window.removeEventListener('kavach:clear-all-data', handleClear);
      window.removeEventListener('kavach:quick-exit', handleClear);
    };
  }, []);

  // Cleanup object URLs on unmount
  useEffect(() => {
    const urls = objectUrlsRef.current;
    return () => {
      urls.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {
          // ignore
        }
      });
      urls.clear();
    };
  }, []);

  const addItem = (item: EvidenceItem) => {
    if (item.previewUrl) {
      objectUrlsRef.current.add(item.previewUrl);
    }
    setItems((prev) => [...prev, item]);
  };

  const addItems = (newItems: EvidenceItem[]) => {
    newItems.forEach((item) => {
      if (item.previewUrl) {
        objectUrlsRef.current.add(item.previewUrl);
      }
    });
    setItems((prev) => [...prev, ...newItems]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const itemToRemove = prev.find((item) => item.id === id);
      if (itemToRemove && itemToRemove.previewUrl) {
        try {
          URL.revokeObjectURL(itemToRemove.previewUrl);
          objectUrlsRef.current.delete(itemToRemove.previewUrl);
        } catch {
          // ignore
        }
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const updateItemField = <K extends keyof EvidenceItem>(id: string, field: K, value: EvidenceItem[K]) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const clearItems = () => {
    items.forEach((item) => {
      if (item.previewUrl) {
        try {
          URL.revokeObjectURL(item.previewUrl);
        } catch {
          // ignore
        }
      }
    });
    objectUrlsRef.current.clear();
    setItems([]);
  };

  return (
    <EvidenceContext.Provider
      value={{
        items,
        setItems,
        addItem,
        addItems,
        removeItem,
        updateItemField,
        clearItems,
        incidentCategory,
        setIncidentCategory,
      }}
    >
      {children}
    </EvidenceContext.Provider>
  );
};

export const useEvidence = (): EvidenceContextType => {
  const context = useContext(EvidenceContext);
  if (!context) {
    throw new Error('useEvidence must be used within an EvidenceProvider');
  }
  return context;
};
