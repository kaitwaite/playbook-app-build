# gate-screen-starter

Canonical BYOK gate screen component for Kate's Claude-powered tools.

## Usage

Copy `GateScreen.tsx` and `GateScreen.module.css` into your app's components folder.

Configure the 5 constants at the top of `GateScreen.tsx`:
- `PRODUCT_NAME` — your app name
- `PRODUCT_TAGLINE` — one-line description
- `FEATURE_LIST` — array of feature bullet points
- `ACCENT_COLOR` — defaults to mustard (#C4882A)
- `GITHUB_URL` — link to your public repo

Then use it in your page:

```tsx
import GateScreen from "@/components/GateScreen";

export default function Page() {
  const [apiKey, setApiKey] = useState("");
  
  if (!apiKey) return <GateScreen onKeySubmit={setApiKey} />;
  
  return <YourApp apiKey={apiKey} />;
}
```

## Source of truth

`voice-tone-shifter.katehaan.dev` — the canonical deployed example.

## Deployment pattern

- `main` branch — no gate, for team/internal use
- `byok` branch — gate screen enabled, deployed to `[repo]-demo.katehaan.dev`
