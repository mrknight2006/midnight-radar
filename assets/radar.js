(async function () {
  const data = await fetchCoreStatus();
  const prof = data?.skills ?? {};

  const labels = ["Physics", "Maths", "PC", "IC", "OC"];
  const values = [
    prof.physics?.score || 0,
    prof.maths?.score || 0,
    prof.pc?.score || 0,
    prof.ic?.score || 0,
    prof.oc?.score || 0
  ];

  const canvas = document.getElementById("radarCanvas");
  const ctx = canvas.getContext("2d");

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const rmax = Math.min(cx, cy) * 0.75;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(0,208,255,0.2)";

  // draw rings
  for (let i = 1; i <= 5; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, rmax * (i / 5), 0, Math.PI * 2);
    ctx.stroke();
  }

  // polygon
  ctx.beginPath();
  values.forEach((v, i) => {
    const angle = i * (Math.PI * 2) / values.length - Math.PI / 2;
    const rad = (v / 100) * rmax;
    const x = cx + rad * Math.cos(angle);
    const y = cy + rad * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(0,208,255,0.18)";
  ctx.fill();
  ctx.strokeStyle = "#00d0ff";
  ctx.stroke();
})();
