(function () {
  "use strict";

  var root = document.querySelector("[data-series-detail]");
  if (!root) return;

  var tablist = root.querySelector("[role='tablist']");
  var tabs = Array.prototype.slice.call(root.querySelectorAll("[data-series-tab]"));
  var panels = Array.prototype.slice.call(root.querySelectorAll("[data-series-panel]"));
  if (!tablist || !tabs.length || !panels.length) return;

  function selectTab(key, focus) {
    tabs.forEach(function (tab) {
      var selected = tab.getAttribute("data-series-tab") === key;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
    panels.forEach(function (panel) {
      panel.hidden = panel.getAttribute("data-series-panel") !== key;
    });
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      selectTab(tab.getAttribute("data-series-tab"), false);
    });
    tab.addEventListener("keydown", function (event) {
      var nextIndex;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") nextIndex = (index + tabs.length - 1) % tabs.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = tabs.length - 1;
      else return;
      event.preventDefault();
      selectTab(tabs[nextIndex].getAttribute("data-series-tab"), true);
    });
  });

  selectTab(tabs[0].getAttribute("data-series-tab"), false);
  tablist.hidden = false;
}());
