name: Pull Request
description: Submit a change to the SheerID Link Extractor
title: "[PR]: "
labels: []
body:
  - type: markdown
    attributes:
      value: |
        Thanks for contributing! Please fill out the details below so we can review your change.
  - type: textarea
    id: summary
    attributes:
      label: Summary
      description: What does this PR do?
      placeholder: Brief description of the change and motivation.
    validations:
      required: true
  - type: dropdown
    id: type
    attributes:
      label: Type of change
      description: What kind of change is this?
      options:
        - 🐛 Bug fix
        - ✨ New feature
        - 📝 Documentation
        - ♻️ Refactor
        - 🔧 CI / build
        - Other
    validations:
      required: true
  - type: textarea
    id: testing
    attributes:
      label: Testing
      description: How did you verify your change works?
      placeholder: e.g. Ran node scripts/validate.js, tested on Chrome + Tampermonkey.
    validations:
      required: true
  - type: checkboxes
    id: checklist
    attributes:
      label: Checklist
      options:
        - label: I have run `node scripts/validate.js` and it passes.
          required: true
        - label: I have tested my change in a browser (Tampermonkey / Violentmonkey / Userscripts).
          required: true
        - label: My change does not add bypass, forgery, or identity-impersonation capability.
          required: true
