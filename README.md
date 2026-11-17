# Kavach

> An AI-powered cyber-abuse response companion that turns panic into action.

Kavach guides victims of online abuse through the first critical hour, preserves verifiable digital evidence using cryptographic hashing, drafts complaints in Hindi or English, and tracks takedown requests, all while prioritizing privacy.

We're not building another helpline. We're building a companion that helps people act.

## Features

- **First-hour guidance:** Step-by-step help for what to do immediately after experiencing cyber abuse.
- **Verifiable evidence preservation:** Captures digital evidence and secures it with cryptographic hashing so it can be verified later.
- **Complaint drafting:** Generates complaint drafts in Hindi or English.
- **Takedown tracking:** Keeps track of takedown requests and their status.
- **Privacy-first design:** Built to minimize data exposure for people in vulnerable situations.

## Tech Stack

- **Frontend:** TypeScript, Vite
- **Backend / Database:** Supabase
- **Package manager:** Bun
- **AI:** Google AI Studio (repository generated from the [aistudio-repository-template](https://github.com/google-gemini/aistudio-repository-template))

## Project Structure

```
KAVACH/
├── src/            # Application source code
├── supabase/       # Supabase config, migrations, and functions
├── scripts/        # Utility and build scripts
├── docs/           # Project documentation
├── index.html      # Entry HTML
├── vite.config.ts  # Vite configuration
├── PROGRESS.md     # Development progress log
└── .env.example    # Required environment variables
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (or Node.js, if you adapt the scripts)
- A [Supabase](https://supabase.com) project
- A Gemini API key from Google AI Studio

### Installation

```bash
git clone https://github.com/Prakhar-Agar/KAVACH.git
cd KAVACH
bun install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `VITE_SUPABASE_URL` | Your Supabase project URL *(verify name)* |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key *(verify name)* |
| `GEMINI_API_KEY` | API key for the AI features *(verify name)* |

> Never commit your `.env` file. It is already listed in `.gitignore`.

### Running Locally

```bash
bun run dev
```

Then open the local URL printed in your terminal.

### Database Setup

Apply the Supabase schema and migrations from the `supabase/` directory using the Supabase CLI:

```bash
supabase db push
```

## Usage

1. Open the app and select the option that best describes your situation.
2. Follow the first-hour guidance to secure your accounts and preserve evidence.
3. Use the complaint generator to draft a report in Hindi or English.
4. Track takedown requests and their status from the dashboard.

## Documentation

Additional details are in the [`docs/`](./docs) folder. For development history and current status, see [`PROGRESS.md`](./PROGRESS.md).

## Contributing

Contributions are welcome. Please open an issue to discuss significant changes before submitting a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## Disclaimer

Kavach provides guidance and documentation support. It is not a substitute for legal advice or emergency services. If you are in immediate danger, contact local emergency services

## Authors 
1.Kuldeep Srivastava
2.Prakhar agarwal
3.Saumya Kasaudhan



## Author

**Prakhar Agar** — [@Prakhar-Agar](https://github.com/Prakhar-Agar)
