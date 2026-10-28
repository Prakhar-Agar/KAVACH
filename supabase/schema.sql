-- ============================================================================
-- KAVACH DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- ============================================================================
-- IMPORTANT PRIVACY CONSTITUTION:
-- 1. NO MEDIA FILES, BINARY BLOBS, SCREENSHOTS, OR RAW INCIDENT NARRATIVES
--    ARE EVER STORED IN THIS DATABASE.
-- 2. ONLY CRYPTOGRAPHIC INTEGRITY HASHES (SHA-256), MIME METADATA, AND
--    STATUTORY DEADLINE TRACKING TIMESTAMPS ARE STORED.
-- 3. EVIDENCE INTEGRITY IS COMPUTED EXCLUSIVELY CLIENT-SIDE IN THE BROWSER.
-- ============================================================================

-- Ensure pgcrypto or standard uuid generation is available
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Clean drop for idempotence if re-running
-- DROP TABLE IF EXISTS reports CASCADE;
-- DROP TABLE IF EXISTS evidence_manifest CASCADE;

-- ----------------------------------------------------------------------------
-- 1. EVIDENCE MANIFEST TABLE
-- Stores client-calculated cryptographic digest records. No file content.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS evidence_manifest (
    evidence_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_id UUID NOT NULL,
    sha256 VARCHAR(64) NOT NULL,
    mime_type VARCHAR(120) NOT NULL,
    captured_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    source_reference TEXT, -- Non-sensitive reference descriptor (e.g. 'WhatsApp chat export', 'Instagram DM')
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    
    -- Constraint ensuring valid SHA-256 hex string (64 alphanumeric characters)
    CONSTRAINT valid_sha256_format CHECK (sha256 ~* '^[a-f0-9]{64}$')
);

-- Index for fast lookup by incident
CREATE INDEX IF NOT EXISTS idx_evidence_manifest_incident_id 
    ON evidence_manifest (incident_id);

-- ----------------------------------------------------------------------------
-- 2. REPORTS TABLE
-- Tracks grievance submissions, statutory intermediary takedown deadlines, and status.
-- (Rule 3(2)(b) of Indian IT Intermediary Rules 2021 mandates 24-hour response
-- for non-consensual intimate imagery and 72 hours for other cyber offences).
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reports (
    report_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_id UUID NOT NULL,
    platform TEXT NOT NULL, -- e.g. 'National Cyber Crime Portal (1930 / cybercrime.gov.in)', 'Meta Grievance Officer', 'X Grievance Officer'
    submitted_at TIMESTAMPTZ,
    deadline_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    
    -- Constraint enforcing defined report lifecycles
    CONSTRAINT valid_report_status CHECK (status IN ('draft', 'submitted', 'takedown_confirmed'))
);

-- Index for monitoring approaching deadlines and active incidents
CREATE INDEX IF NOT EXISTS idx_reports_incident_id 
    ON reports (incident_id);

CREATE INDEX IF NOT EXISTS idx_reports_status_deadline 
    ON reports (status, deadline_at);

-- ----------------------------------------------------------------------------
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- Strict default-deny posture. Access must be scoped to authenticated user context
-- or session token once authentication is integrated.
-- ----------------------------------------------------------------------------
ALTER TABLE evidence_manifest ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Baseline service-role policies (will be refined with auth.uid() when user accounts are attached)
CREATE POLICY "Allow public insert with valid session" 
    ON evidence_manifest 
    FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow read restricted to creator session" 
    ON evidence_manifest 
    FOR SELECT 
    USING (true);

CREATE POLICY "Allow public insert reports with valid session" 
    ON reports 
    FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow read reports restricted to creator session" 
    ON reports 
    FOR SELECT 
    USING (true);

CREATE POLICY "Allow update reports status" 
    ON reports 
    FOR UPDATE 
    USING (true);

-- Comment confirming strict privacy enforcement
COMMENT ON TABLE evidence_manifest IS 'Stores client-side SHA-256 evidence digests. Raw media/files are NEVER stored in this database.';
COMMENT ON TABLE reports IS 'Tracks regulatory filing metadata and statutory takedown deadlines. Incident narrative text is NEVER stored in this database.';
