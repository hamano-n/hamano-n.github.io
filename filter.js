(() => {
  "use strict";

  const list = document.getElementById("activity-list");
  const status = document.getElementById("filter-status");
  if (!list || !status) return;

  const items = Array.from(list.querySelectorAll(".timeline-item[data-category]"));

  // <time datetime="YYYY-MM-DD"> の日付を使い、新しい順に並べ替える。
  // HTML内でどこに追加しても、ページ読み込み時に順序を整える。
  items.sort((a, b) => {
    const dateA = a.querySelector("time[datetime]")?.dateTime || "";
    const dateB = b.querySelector("time[datetime]")?.dateTime || "";
    return dateB.localeCompare(dateA);
  });
  items.forEach((item) => list.appendChild(item));

  const labels = {
    all: "すべての活動",
    music: "楽曲",
    video: "動画",
    stream: "配信",
    notice: "告知"
  };

  const params = new URLSearchParams(window.location.search);
  const requested = params.get("category") || "all";
  const category = Object.prototype.hasOwnProperty.call(labels, requested) ? requested : "all";
  let visibleCount = 0;

  items.forEach((item) => {
    const visible = category === "all" || item.dataset.category === category;
    item.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  status.textContent = `${labels[category]}：${visibleCount}件を表示しています（新しい順）。`;
})();
