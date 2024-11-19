dw.on("learned", () => {
  window.setTimeout(async () => fetch(
    `https://dw.kvn.wtf/learned/${dw.c.aid}/${dw.c.cid}/${dw.c.name}`,
    {
      method: "POST",
      body: JSON.stringify({
        passives: Object.entries(dw.c.learnedPassives)
          .map(([mod, { lvl, tier }]) => ({ mod, lvl, tier })),
        skills: Object.entries(dw.c.learnedSkills)
          .map(([mod, { lvl, tier }]) => ({ mod, lvl, tier })),
        stats: Object.entries(dw.c.learnedStats)
          .map(([mod, { lvl, pts, tier }]) => ({ mod, lvl, pts, tier }))
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  ), 200)
})
