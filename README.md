# 阿垚在洛杉矶 · 单页落地页

基于 Next.js + Tailwind CSS + Lucide React + Framer Motion 的高端单页落地页，大地色系、衬线/无衬线字体、极简布局。

## 运行方式

```bash
npm install
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。

## 技术栈

- **Next.js 14** (App Router)
- **Tailwind CSS**：配色 `#F5F5F5` / `#3D463D` / `#966B4A`
- **Lucide React**：图标（如导航 Logo）
- **Framer Motion**：区块由下至上淡入动画
- **Unsplash**：背景与卡片图片占位（images.unsplash.com）

## 结构说明

- `src/components/Navbar.tsx`：导航，滚动后背景由透明变为米色
- `src/components/HeroSection.tsx`：全屏 Hero + 左上角欢迎卡片
- `src/components/IntroductionSection.tsx`：简介区（标题与描述占位）
- `src/components/ServiceSection.tsx`：服务项目（三卡片，占位）
- `src/components/DataBanner.tsx`：暖棕色数据横幅（占位）
- `src/components/Footer.tsx`：深橄榄绿页脚，Logo + 微信联系指引

占位区块已预留标题/描述结构，内容可后续填充。
# ca-school-district-report
