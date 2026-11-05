# Main page form: GoHighLevel setup

The main page (`src/pages/designs/13.astro`, at `/preview/designs/13/`) has one simple form in its "Start Your Admission" section, built in `src/designs/ApplyForm.astro`. Until it is connected, that section shows a design preview that sends nothing and is marked "Preview: form not connected".

## 1. Build the form in GoHighLevel
Sites > Forms > Builder > New form. Name it `Hero Admission Form`.

| Field | Type | Required |
|---|---|---|
| Full Name | Full name | Yes |
| Phone | Phone | Yes |
| Email | Email | Yes |

- **Do not add** a heading. The page already shows "Start Your Admission".
- **Button text:** `Continue to Admission`
- **Consent:** add the SMS and marketing consent element with the wording your compliance setup requires. The preview's sentence is only a placeholder. Keep it as short as you can, because every extra line pushes the button down.
- **Styles:** set the form background to transparent, then paste the CSS below into Custom CSS.

## 2. Send people on to Admission
In the form's options, set **On submit** to **Redirect to URL**:

`https://www.californiadentalassistant.com/apply-for-admission`

That page has the booking calendar. To save people retyping their details, try adding the name, email and phone to the address if your form offers this, then submit one test entry and check that the calendar fills in. This has not been tested.

## 3. Tell the team about new entries
Add a workflow with the trigger **Form Submitted > Hero Admission Form**. It should tag the contact (for example `hero-form`) and notify admissions.

## 4. Connect it to the page
1. In the form's Integrate/Embed screen, copy the form ID. It is the last part of the link: `.../widget/form/THIS_PART`.
2. Paste it in `src/config.ts`:
   ```ts
   export const HERO_FORM_ID = 'THIS_PART';
   ```
3. Rebuild and deploy. The preview form and its note disappear by themselves.
4. If the form ends up taller or shorter, change `height:320px` on the iframe in `src/designs/ApplyForm.astro`. The embed script normally resizes it.

## 5. Test before going live
Submit one entry on desktop and one on a phone. Check that the contact appears in GoHighLevel, the workflow runs, and the page moves on to Admission.

## Custom CSS

```css
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@500;600;700&display=swap');
.ghl-form-wrap, .hl_form-builder--main { padding: 0 !important; background: transparent !important; max-width: none !important; }
.form-builder--wrap { padding: 0 !important; border: 0 !important; background: transparent !important; box-shadow: none !important; max-width: none !important; }
.fields-container { margin: 0 !important; padding: 0 !important; }
.form-field-wrapper { margin: 0 0 9px !important; padding: 0 !important; }
.form-builder--item { margin: 0 !important; padding: 0 !important; border: 0 !important; }
label.label-alignment { margin-bottom: 3px !important; color: #1f2544 !important; font: 600 13px/1.25 'Work Sans', sans-serif !important; }
.ghl-form-wrap .form-builder--item input.form-control { height: 42px !important; border: 1px solid #aab4c3 !important; border-radius: 4px !important; color: #1f2544 !important; font: 500 16px 'Work Sans', sans-serif !important; font-size: 16px !important; }
.ghl-form-wrap .form-builder--item input.form-control:focus { border-color: #0b345b !important; box-shadow: 0 0 0 1px #0b345b !important; }
button.button-element { width: 100% !important; min-height: 48px !important; padding: 10px 14px !important; border: 0 !important; border-radius: 4px !important; background: #fdbf60 !important; box-shadow: none !important; }
button.button-element, button.button-element * { color: #082743 !important; font: 700 14px 'Work Sans', sans-serif !important; letter-spacing: 0.06em !important; text-transform: uppercase !important; }
button.button-element:hover { background: #f7ad3c !important; }
```

These class names were read from the site's existing GoHighLevel form and tried on it in the browser. The menu names above may differ a little in your account.
