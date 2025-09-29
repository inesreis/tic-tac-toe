# 🧠 Tic-Tac-Toe (React + TypeScript)

This is a feature-rich and scalable Tic-Tac-Toe game built in **React** with **TypeScript**, modern **testing frameworks**, and enhanced UI/UX. It started as a simple tutorial project and evolved as I learned new React concepts, testing practices, and development workflows.

---

## 📚 Based On

Original Tutorial:  
🔗 [React Official Tutorial - Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe)

Original Sandbox (IED):  
🔗 [CodeSandbox Fork](https://codesandbox.io/p/devbox/react-dev-forked-mczzms?file=%2Fsrc%2FApp.js%3A48%2C21&workspaceId=ws_BfhuVkuATKwkYTD8u6m2Zz)

---

## 🚀 Tech Stack

| Category          | Tool / Library                                                                                                   |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Framework**     | [React](https://react.dev)                                                                                       |
| **Language**      | [TypeScript](https://www.typescriptlang.org/)                                                                    |
| **Bundler**       | [Vite](https://vite.dev/guide/)                                                                                  |
| **Testing**       | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) |
| **Icons**         | [Lucide React](https://lucide.dev/)                                                                              |
| **Fonts**         | [Google Fonts](https://fonts.google.com/selection/embed)                                                         |
| **Color Palette** | [Coolors Palette](https://coolors.co/58a88d-2b2d42-9684a1-fffbfc-e5b181)                                         |
| **Editor Theme**  | [Xcode (customized palette)]                                                                                     |

---

## ✅ Features

- Classic Tic-Tac-Toe Game Logic
- Modern UI with responsive design
- Player selection (X or O)
- Move history & undo functionality
- Win/draw detection with UI feedback
- Dark/light theme toggle
- Device context (mobile/desktop awareness)
- Type-safe with TypeScript
- Component-level **unit tests**
- App-level **integration tests**
- Thorough test coverage using Vitest

---

## 🧪 Testing Strategy

Testing is structured into:

- **Unit Tests**: For isolated components (`Game`, `Square`, `Board`, etc.)
- **Integration Tests**: For full app behavior (`App.test.tsx`)
- **Mocking**: Used where appropriate to isolate logic from UI

Frameworks used:

- 🔹 [Vitest](https://vitest.dev/api/) — modern Vite-native test runner
- 🔹 [Testing Library](https://testing-library.com/) — user-focused test utilities

---

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test
```

## 🧑‍💻 Development Process

- Started from the basic tutorial code (all in JavaScript)
- Migrated to TypeScript for static typing
- Introduced componentization and separation of concerns
- Built a custom game logic hook
- Added dark/light theme context
- Added device detection context
- Implemented undo feature with game history
- Integrated Testing Library and Vitest
- Added component mocks for focused unit testing
- Applied styling refinements with modern color palettes and fonts

## 🎨 Design

- Icons: [Lucide](https://lucide.dev/)

- Fonts: [Google Fonts](https://fonts.google.com/)
  - [https://github.com/googlefonts/dynapuff](https://github.com/googlefonts/dynapuff)
  - [https://github.com/andrew-paglinawan/QuicksandFamily](https://github.com/andrew-paglinawan/QuicksandFamily)

## 🙏 Acknowledgements

- [React Tutorial](https://react.dev/learn/tutorial-tic-tac-toe)
- [Vite Documentation](https://vite.dev/guide/)
- [Vitest Documentation](https://vitest.dev/api/)
- [Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
