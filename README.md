# TI Calculator Support Request Generator

A web app that helps users compose a complete, correctly formatted support message for Texas Instruments calculator warranty claims — eliminating the usual back-and-forth with TI support.

**Live at [claim.kmiguel.com](https://claim.kmiguel.com)**

## Why

When contacting TI support for a warranty claim, the user is asked to provide seven specific pieces of information in a follow-up email. Most users don't know this upfront, which causes days of unnecessary back-and-forth. This app lets the user prepare the complete message on the first attempt.

## Privacy

All data stays in the browser. The app makes **zero network requests** at runtime — no server, no analytics, no tracking, no file uploads. Form data is persisted in `localStorage` so it survives page refreshes, and can be cleared with the "Start over" button.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Hosting | [Cloudflare Workers](https://workers.cloudflare.com/) via [OpenNext](https://opennext.js.org/cloudflare) |

## Development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

### Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start local Next.js dev server |
| `npm run build` | Production build |
| `npm run preview` | Build and preview with Wrangler locally |
| `npm run deploy` | Build and deploy to Cloudflare Workers |
| `npm run cf-typegen` | Regenerate Cloudflare binding types |

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout and metadata
    page.tsx            # Entry point — renders <App />
    globals.css         # Tailwind imports
  components/
    App.tsx             # Wizard root — state, step routing, localStorage
    ProgressBar.tsx     # Clickable step indicator
    PrivacyBadge.tsx    # "Data never leaves this device" badge
    StepWelcome.tsx     # Step 0 — issue type selection
    StepPersonal.tsx    # Step 1 — name, address, phone
    StepCalculator.tsx  # Step 2 — model, serial number, date code
    StepAttachments.tsx # Step 3 — attachment checklist with example images
    StepReview.tsx      # Step 4 — preview, copy, link to TI form
    ImageModal.tsx      # Fullscreen image viewer
    PhonePrefixSelect.tsx # Searchable phone country code dropdown
  data/
    calculatorModels.ts # Supported TI calculator models
    countries.ts        # Country list for address form
    issueTemplates.ts   # Issue types and generated descriptions
    phoneCountryCodes.ts # Country codes with emoji flags
  utils/
    generateMessage.ts  # Assembles the final support message
    validation.ts       # Per-step form validation
public/
  examples/             # Example attachment images (WebP)
```

## License

[GNU Affero General Public License v3.0](LICENSE)
