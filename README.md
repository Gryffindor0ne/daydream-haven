# Daydream Haven

> 커피브랜드 홈페이지 & 커피쇼핑몰 [Daydream Haven ☕️ ](https://daydream-haven.vercel.app/)

> 자세한 정보는 ['포트폴리오'로 이동 🥐](https://ukjae-portfolio.vercel.app/projects/daydreamHaven)

<br>

[![Daydream Haven](public/assets/images/daydream-haven.png)](https://daydream-haven.vercel.app/)

<br>

## 🎙️ Description

Daydream Haven은 가상의 커피브랜드 홈페이지이면서 커피쇼핑몰입니다.
'평소 좋아하는 커피를 브랜드화해서 웹페이지로 직접 만든다면 어떨까?' 라는 생각으로 기획했습니다.<br><br>
프로젝트는 총 About, Shop, Wholesale, Subsription, contact의 5가지 카테고리로 구성되어 있습니다. <br><br>
About은 해당 브랜드에 대한 설명이 있으며, Shop, Wholesale, Subsription은 판매하는 상품에 대한 페이지입니다. (but, Wholesale은 간단히 구현되었습니다.)<br>
Contact은 실제 매장이 존재한다는 전제하에 매장에 대한 정보를 제공하는 페이지로 구현되었습니다.<br>
Cart 페이지에서는 상품을 주문할 수 있으며, 주문페이지에서는 실제 결제를 하듯 결제를 진행할 수 있도록 가상결제 서비스를 구현하였습니다.

<br>

## 💡 Main Feature

### 상품 정보 조회 및 선택 기능

-   Shop, Subsription 페이지에서 각 카테고리에 맞는 판매하는 모든 상품 조회 가능.
-   원하는 상품을 선택하면 상품 상세페이지에서 상품 정보 조회 가능.
-   상품 상세페이지에서 옵션을 선택하고 상품을 장바구니에 담거나 바로 구매 가능.
-   상품 상세페이지에서 여러 상품 선택 가능하며, 선택한 상품의 수량을 변경 또는 삭제 가능.

### 장바구니 기능

-   원하는 상품 혹은 전체 상품을 주문 가능.
-   특정 상품의 수량을 변경 가능.
-   장바구니에서 특정 상품 혹은 전체 상품을 삭제 기능
-   선택한 상품의 총 금액에 따라 배송비 유무 확인 가능.

### 가상 결제 서비스

-   주문페이지에서 포트원(Portone) 온라인 결제서비스를 통한 가상 결제 구현

<br>

## 🖥️ Getting Started

### Installation

```sh
git clone https://github.com/Gryffindor0ne/daydream-haven.git
npm install
```

### Develop Mode

```sh
npm run dev
```

<br>

## ⛵️ Stack

🖥️ Frontend : React, TypeScript, Redux, Redux-Saga, Redux-Persist, MUI <br><br>
🧺 Backend : Heroku <br><br>
🎉 Deployment : Vercel

<br>

## 🪜 Project Structure

```
├─ public
│  ├─ assets
│  │  └─ images
│  │     └─ daydream-haven.png
│  └─ favicon.ico
├─ src
│  ├─ App.tsx
│  ├─ api
│  │  ├─ checkAccessTokenValidityAPI.ts
│  │  ├─ checkOrderDetailAPI.ts
│  │  └─ getUserInfoDetailAPI.ts
│  ├─ app
│  │  ├─ reduxHooks.ts
│  │  ├─ rootSaga.ts
│  │  └─ store.ts
│  ├─ components
│  │  ├─ cart
│  │  │  ├─ CartItem.tsx
│  │  │  └─ CartOrderSection.tsx
│  │  ├─ common
│  │  │  ├─ CapacityGrindSelector.tsx
│  │  │  ├─ LoadingIndicator.tsx
│  │  │  └─ QuantityButton.tsx
│  │  ├─ layout
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Header.tsx
│  │  │  └─ popup
│  │  │     ├─ BasicPopup.tsx
│  │  │     ├─ CartGuidancePopup.tsx
│  │  │     └─ DuplicateGuidancePopup.tsx
│  │  ├─ location
│  │  │  ├─ AddressSeacrchForm.tsx
│  │  │  └─ Map.tsx
│  │  ├─ order
│  │  │  ├─ OrderItem.tsx
│  │  │  └─ OrdererInfo.tsx
│  │  └─ product
│  │     ├─ Product.tsx
│  │     ├─ ProductInfoBox.tsx
│  │     ├─ ProductSelectBox.tsx
│  │     ├─ ProductSummaryBox.tsx
│  │     ├─ ProductsList.tsx
│  │     └─ SubscriptionInfoBox.tsx
│  ├─ features
│  │  ├─ auth
│  │  │  ├─ authSaga.ts
│  │  │  └─ authSlice.ts
│  │  ├─ cart
│  │  │  └─ cartSlice.ts
│  │  ├─ order
│  │  │  └─ orderSlice.ts
│  │  └─ payment
│  │     ├─ paymentSaga.ts
│  │     └─ paymentSlice.ts
│  ├─ hooks
│  │  └─ useCurrentPathAndId.ts
│  ├─ index.css
│  ├─ lib
│  │  └─ axiosInstance
│  │     ├─ constants.ts
│  │     └─ index.ts
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ About.tsx
│  │  ├─ Contact.tsx
│  │  ├─ OrderComplete.tsx
│  │  ├─ OrderPayment.tsx
│  │  ├─ ProductDetail.tsx
│  │  ├─ Router.tsx
│  │  ├─ Shop.tsx
│  │  ├─ ShoppingCart.tsx
│  │  ├─ Subscription.tsx
│  │  ├─ Wholesale.tsx
│  │  ├─ auth
│  │  │  ├─ Login.tsx
│  │  │  └─ Register.tsx
│  │  ├─ index.tsx
│  │  └─ routes
│  │     ├─ LoginRouteGuard.tsx
│  │     └─ PrivatedRoute.tsx
│  ├─ theme
│  │  └─ index.tsx
│  ├─ utils
│  │  ├─ constants.ts
│  │  ├─ cookiesUtils.ts
│  │  └─ utils.ts
│  └─ vite-env.d.ts
├─ tsconfig.json
├─ tsconfig.node.json
├─ vercel.json
└─ vite.config.ts

```

<br>

<p align='center'>
   <img src="https://img.shields.io/badge/TypeScript-^5.2.2-darkblue?logo=TypeScript"/>  
    <img src="https://img.shields.io/badge/React-^18.2.0-blue?logo=React"/>
    <img src="https://img.shields.io/badge/Node.js-v21.1.0-green?logo=Node.js"/> 
   
</p>
