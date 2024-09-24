import "../pages/root.css"
function importAll(r) {
    r.keys().forEach(r);
}

importAll(require.context('../_images/', true, /\.(png|svg|jpg|jpeg|gif|webp)$/i));