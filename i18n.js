// Язык интерфейса: по языку Telegram на телефоне. Словари – в папке i18n/ (ключ – русская фраза, значение – перевод).
// Если перевода нет, остаётся русский текст. Для проверки любого языка: ?lang=ar в адресе.
(function () {
  var MAP = { ru: "ru", be: "ru", uk: "uk", kk: "kk", en: "en", es: "es", ar: "ar", uz: "uz", tr: "tr", pt: "pt", de: "de", fr: "fr" };
  var code = "";
  try { code = new URLSearchParams(location.search).get("lang") || ""; } catch (e) {}
  // Язык, выбранный вручную в приложении (кнопка в шапке)
  if (!code) { try { code = localStorage.getItem("ui_lang") || ""; } catch (e) {} }
  if (!code) {
    try { code = Telegram.WebApp.initDataUnsafe.user.language_code || ""; } catch (e) {}
  }
  if (!code) code = navigator.language || "ru";
  var lang = MAP[String(code).toLowerCase().slice(0, 2)] || "en";
  window.__lang = lang;
  window.I18N = {};
  document.documentElement.lang = lang;
  if (lang === "ar") document.documentElement.dir = "rtl";
  if (lang !== "ru") document.write('<script src="i18n/' + lang + '.js?v=1"><\/script>');

  window.L = function (s) { var d = window.I18N; return (d && d[s]) || s; };
  window.Lf = function (s) {
    var a = arguments, f = window.L(s);
    return f.replace(/\{(\d+)\}/g, function (_, i) { var v = a[+i + 1]; return v == null ? "" : v; }).replace(/\{\{/g, "{").replace(/\}\}/g, "}");
  };
  window.LOCALE = { ru: "ru-RU", uk: "uk-UA", kk: "kk-KZ", en: "en-GB", es: "es-ES", ar: "ar", uz: "uz-UZ", tr: "tr-TR", pt: "pt-BR", de: "de-DE", fr: "fr-FR" }[lang];
  if (lang === "ru") return;

  // Перевод того, что уже на экране и что появляется: точные фразы и шаблоны с {0}
  var patterns = null;
  function buildPatterns() {
    patterns = [];
    var d = window.I18N || {};
    Object.keys(d).forEach(function (k) {
      if (!/\{\d+\}/.test(k)) return;
      var re = "^" + k.replace(/[.*+?^$()|[\]\\]/g, "\\$&").replace(/\{(\d+)\}/g, "(.+?)") + "$";
      try { patterns.push({ re: new RegExp(re), to: d[k] }); } catch (e) {}
    });
  }
  function tr(s) {
    var k = s.trim();
    if (!k || !/[А-Яа-яЁё]/.test(k)) return s;
    var d = window.I18N || {};
    if (d[k]) return s.replace(k, d[k]);
    if (!patterns) buildPatterns();
    for (var i = 0; i < patterns.length; i++) {
      var m = k.match(patterns[i].re);
      if (m) return s.replace(k, patterns[i].to.replace(/\{(\d+)\}/g, function (_, n) { return m[+n + 1] || ""; }));
    }
    return s;
  }
  var ATTRS = ["placeholder", "aria-label", "title", "alt"];
  function walk(node) {
    if (node.nodeType === 3) { var v = tr(node.nodeValue); if (v !== node.nodeValue) node.nodeValue = v; return; }
    if (node.nodeType !== 1 || node.tagName === "SCRIPT" || node.tagName === "STYLE") return;
    for (var a = 0; a < ATTRS.length; a++) {
      var val = node.getAttribute(ATTRS[a]);
      if (val) { var nv = tr(val); if (nv !== val) node.setAttribute(ATTRS[a], nv); }
    }
    for (var c = node.firstChild; c; c = c.nextSibling) walk(c);
  }
  window.translateDom = walk;
  document.addEventListener("DOMContentLoaded", function () {
    walk(document.body);
    new MutationObserver(function (list) {
      list.forEach(function (m) {
        if (m.type === "characterData") walk(m.target);
        else m.addedNodes.forEach(walk);
      });
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  });
})();
