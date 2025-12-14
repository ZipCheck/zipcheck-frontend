# Zipcheck Frontend

Zipcheck의 프런트엔드 프로젝트입니다. Vue 3.1.9, Vite, TailwindCSS v3 기반으로 구성되어 있으며, 개발 환경은 Node.js v22.12.0, npm 10.9.0 버전에서 동작합니다.

---

## 기술 스택

* Vue 3.1.9
* Vite
* Vue Router
* TailwindCSS v3
* PostCSS / Autoprefixer
* ESLint + Prettier
* Node.js v22.12.0
* npm 10.9.0

---

## 프로젝트 클론

```bash
git clone https://github.com/USERNAME/zipcheck-frontend.git
cd zipcheck-frontend
```

---

## 의존성 설치

```bash
npm install
```

Node 22 환경에서는 일부 패키지가 경고를 출력할 수 있으나, TailwindCSS v3를 구성 파일 기반(Local Build) 방식으로 사용하기 때문에 정상적으로 동작합니다.

---

## 개발 서버 실행

```bash
npm run dev
```

접속 주소:

```
http://localhost:5173
```

---

## 빌드

```bash
npm run build
```

빌드 결과물은 `dist/` 폴더에 생성됩니다.

---

## TailwindCSS 설정

TailwindCSS는 CDN이 아닌 로컬 환경 빌드 방식으로 적용됩니다. 다음 파일들이 반드시 존재하고 연결되어 있어야 합니다.

* `tailwind.config.js`
* `postcss.config.js`
* `src/assets/base.css`

### main.js에서 Tailwind 로드

```js
import './assets/base.css';
```

### Material Icons 설정

`index.html`에 다음을 추가해야 아이콘이 정상 표시됩니다.

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
```

아이콘 사용 예시:

```html
<span class="material-symbols-outlined">search</span>
```

---

## 프로젝트 구조

```
src/
 ├─ assets/
 │   └─ base.css
 ├─ components/
 │   └─ layout/
 │        └─ Header.vue
 ├─ pages/
 │   └─ MainPage.vue
 ├─ router/
 │   └─ index.js
 ├─ App.vue
 └─ main.js
```

---

## ESLint & Prettier 설정

프로젝트는 ESLint + Prettier를 사용해 자동 코드 정리를 지원합니다. 파일 저장 시 ESLint가 자동으로 Prettier 규칙을 적용합니다.

### VSCode settings.json 설정 방법

VSCode에서 다음을 추가합니다.

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "markdown"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.tabSize": 2
}
```

설치 방법

1. VSCode에서 **Ctrl + Shift + P** 입력
2. "Preferences: Open Settings (JSON)" 선택
3. 위 설정 내용을 그대로 붙여넣기

---

## .eslintrc.cjs 설정

```js
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        useTabs: true,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
        endOfLine: 'auto'
      }
    ]
  }
};
```

설치 방법

1. 프로젝트 루트에 `.eslintrc.cjs` 파일 생성
2. 위 설정 복사 후 저장

### 자동 포맷 동작 방식

* 저장 시 ESLint가 Prettier 규칙을 기반으로 코드 스타일 정리
* 탭, 따옴표, 줄바꿈, 세미콜론 등 일관된 규칙 적용

---

## 환경 버전 정보

| 항목      | 버전      |
| ------- | ------- |
| Vue     | 3.1.9   |
| Node.js | 22.12.0 |
| npm     | 10.9.0  |

---

## 기여 방법

Pull Request 및 Issue 등록을 환영합니다.

---

## 라이선스

원하는 라이선스를 여기에 추가하세요.
