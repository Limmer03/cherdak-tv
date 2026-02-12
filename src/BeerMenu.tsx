import { useEffect, useMemo, useRef, useState } from "react";

type Beer = {
  id: number;
  name: string;
  type: string;
  filtered: string;
  abv: string;
  price: string;
  image?: string;
  recommend?: boolean;
};

export default function BeerMenu() {
  const BASE = import.meta.env.BASE_URL; // важно для GitHub Pages

  const beers: Beer[] = useMemo(
    () => [
      {
        id: 1,
        name: "Хольстен Премиум",
        type: "Светлое",
        filtered: "фильтрованное",
        abv: "4,8%",
        price: "300",
        image: `${BASE}beer1.jpg`,
        recommend: true,
      },
      {
        id: 2,
        name: "Балтика Стаут Нитро",
        type: "Тёмное",
        filtered: "нефильтрованное",
        abv: "4,2%",
        price: "400",
        image: `${BASE}beer2.jpg`,
        recommend: true,
      },
      {
        id: 3,
        name: "Крон Бланш Бьер",
        type: "Светлое",
        filtered: "нефильтрованное",
        abv: "4,5%",
        price: "300",
        image: `${BASE}beer3.jpg`,
        recommend: true,
      },
      {
        id: 4,
        name: "Шлиц Хеллес",
        type: "Светлое",
        filtered: "фильтрованное",
        abv: "4,7%",
        price: "300",
        image: `${BASE}beer4.jpg`,
        recommend: true,
      },
    ],
    [BASE]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [pulseKey, setPulseKey] = useState(0);

  // Для “перелистывания как в видео”
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const animTimer = useRef<number | null>(null);

  const currentBeer = beers[currentIndex];
  const prevBeer = prevIndex === null ? null : beers[prevIndex];

  const goTo = (nextIndex: number) => {
    if (nextIndex === currentIndex) return;

    const nextDir: 1 | -1 = nextIndex > currentIndex ? 1 : -1;
    setDirection(nextDir);

    // запускаем анимацию: старая уходит, новая приходит
    setPrevIndex(currentIndex);
    setCurrentIndex(nextIndex);
    setPulseKey((k) => k + 1);

    if (animTimer.current) window.clearTimeout(animTimer.current);
    animTimer.current = window.setTimeout(() => {
      setPrevIndex(null);
      animTimer.current = null;
    }, 700);
  };

  // автопереключение
  useEffect(() => {
    const interval = window.setInterval(() => {
      const next = (currentIndex + 1) % beers.length;
      goTo(next);
    }, 5000);

    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, beers.length]);

  // fullscreen по клику
  useEffect(() => {
    const enterFullscreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    };
    document.addEventListener("click", enterFullscreen, { once: true });
    return () => document.removeEventListener("click", enterFullscreen);
  }, []);

  return (
    <div className="w-screen h-screen fixed inset-0 bg-black overflow-hidden">
      {/* фон */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(20,0,40,1) 0%, rgba(0,0,0,1) 100%)",
        }}
      />

      {/* сетка */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.45) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 0, 255, 0.35) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* углы (оставляем как у тебя, но лучше выглядит когда не огромные) */}
      <div className="absolute top-8 left-8 w-24 h-24 cornerPulse">
        <div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-transparent"
          style={{ boxShadow: "0 0 10px #FF1493, 0 0 20px #FF1493" }}
        />
        <div
          className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-pink-500 to-transparent"
          style={{ boxShadow: "0 0 10px #FF1493, 0 0 20px #FF1493" }}
        />
      </div>

      <div
        className="absolute top-8 right-8 w-24 h-24 cornerPulse"
        style={{ animationDelay: "0.5s" }}
      >
        <div
          className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-cyan-400 to-transparent"
          style={{ boxShadow: "0 0 10px #00FFFF, 0 0 20px #00FFFF" }}
        />
        <div
          className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-cyan-400 to-transparent"
          style={{ boxShadow: "0 0 10px #00FFFF, 0 0 20px #00FFFF" }}
        />
      </div>

      <div
        className="absolute bottom-8 left-8 w-24 h-24 cornerPulse"
        style={{ animationDelay: "1s" }}
      >
        <div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent"
          style={{ boxShadow: "0 0 10px #0066FF, 0 0 20px #0066FF" }}
        />
        <div
          className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-blue-500 to-transparent"
          style={{ boxShadow: "0 0 10px #0066FF, 0 0 20px #0066FF" }}
        />
      </div>

      <div
        className="absolute bottom-8 right-8 w-24 h-24 cornerPulse"
        style={{ animationDelay: "1.5s" }}
      >
        <div
          className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-pink-500 to-transparent"
          style={{ boxShadow: "0 0 10px #FF1493, 0 0 20px #FF1493" }}
        />
        <div
          className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-pink-500 to-transparent"
          style={{ boxShadow: "0 0 10px #FF1493, 0 0 20px #FF1493" }}
        />
      </div>

      {/* световые пятна */}
      <div
        className="absolute top-20 left-40 w-96 h-96 rounded-full blur-3xl opacity-20 orbFloatA"
        style={{
          background:
            "radial-gradient(circle, rgba(255,20,147,0.6) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-20 right-40 w-96 h-96 rounded-full blur-3xl opacity-20 orbFloatB"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,255,0.6) 0%, transparent 70%)",
        }}
      />

      {/* контент */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* header */}
        <header className="pt-6 pb-2 px-12">
          <div className="flex flex-col items-center">
            <img
              src={`${BASE}logo.png`}
              alt="Чердак Logo"
              className="h-24 w-auto object-contain logoSpark"
            />

            {/* ПИВО — жёстко центрируем как блок */}
            <div className="mt-3 w-full flex justify-center">
              <h1
                className="block w-fit text-white text-7xl tracking-[0.25em] leading-none"
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontWeight: 300,
                  textShadow:
                    "0 0 20px #00FFFF, 0 0 40px #00FFFF, 0 0 60px #FF1493",
                }}
              >
                ПИВО
              </h1>
            </div>

            <p
              className="mt-2 text-center text-cyan-300 text-xl tracking-wider"
              style={{ textShadow: "0 0 10px #00FFFF" }}
            >
              Наша коллекция крафтовых сортов
            </p>
          </div>
        </header>

        {/* main */}
        <div className="flex-1 flex items-center justify-center px-12 pb-8">
          <div className="grid grid-cols-2 gap-12 max-w-[1600px] w-full">
            {/* LEFT (картинка с перелистыванием) */}
            <div className="relative">
              <div className="relative group">
                {/* glow */}
                <div
                  className="absolute -inset-6 rounded-3xl blur-2xl opacity-60 imgGlowPulse"
                  style={{ boxShadow: "0 0 40px #FF1493, 0 0 80px #FF1493" }}
                />

                {/* рамка */}
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    border: "3px solid",
                    borderImage:
                      "linear-gradient(135deg, #FF1493, #00FFFF, #0066FF, #FF1493) 1",
                    boxShadow:
                      "0 0 20px rgba(255,20,147,0.5), 0 0 40px rgba(0,255,255,0.5), inset 0 0 20px rgba(255,20,147,0.1)",
                  }}
                >
                  {/* две картинки: старая и новая */}
                  <div className="relative w-full h-[550px] bg-black">
                    {prevBeer?.image && (
                      <img
                        src={prevBeer.image}
                        alt={prevBeer.name}
                        className={`absolute inset-0 w-full h-full object-cover imgExit ${
                          direction === 1 ? "imgExitLeft" : "imgExitRight"
                        }`}
                        style={{ filter: "contrast(1.1) brightness(0.95)" }}
                      />
                    )}

                    {currentBeer.image ? (
                      <img
                        src={currentBeer.image}
                        alt={currentBeer.name}
                        className={`absolute inset-0 w-full h-full object-cover imgEnter ${
                          direction === 1 ? "imgEnterRight" : "imgEnterLeft"
                        }`}
                        style={{ filter: "contrast(1.1) brightness(0.95)" }}
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center bg-white/5">
                        <div className="text-center text-white/70">
                          <div className="text-2xl">Фото скоро будет</div>
                          <div className="mt-2 text-sm text-white/50">
                            Положи beer1.jpg...beer4.jpg и logo.png в папку public
                          </div>
                        </div>
                      </div>
                    )}

                    {/* затемнение снизу */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* scanlines */}
                    <div className="absolute inset-0 pointer-events-none scanlines" />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT (карточки) */}
            <div className="flex flex-col justify-center space-y-4">
              {beers.map((beer, index) => {
                const active = currentIndex === index;
                const accent = active ? "#FF1493" : "#00FFFF";

                return (
                  <div
                    key={beer.id}
                    className={`relative p-6 rounded-2xl transition-all duration-500 cursor-pointer ${
                      active ? "bg-pink-500/10" : "bg-white/5"
                    }`}
                    onClick={() => goTo(index)}
                    style={{
                      border: active ? "2px solid" : "1px solid rgba(0,255,255,0.2)",
                      borderImage: active
                        ? "linear-gradient(135deg, #FF1493, #00FFFF, #FF1493) 1"
                        : "none",
                      boxShadow: active
                        ? "0 0 30px rgba(255,20,147,0.5), 0 0 60px rgba(0,255,255,0.3), inset 0 0 30px rgba(255,20,147,0.1)"
                        : "0 0 10px rgba(0,255,255,0.1)",
                      transform: active ? "scale(1.03)" : "scale(1)",
                    }}
                  >
                    {/* вспышка при переключении (вокруг карточки) */}
                    {active && (
                      <div
                        key={pulseKey}
                        className="pointer-events-none absolute inset-0 rounded-2xl animate-[pulseGlow_0.9s_ease-out_1]"
                      />
                    )}

                    {/* лёгкая “живая” пульсация всей активной карточки */}
                    <div className={active ? "activePulseWrap" : ""}>
                      <div className="relative z-10 flex justify-between items-start mb-2">
                        <div>
                          <h3
                            className="text-white text-3xl mb-1"
                            style={{
                              fontFamily: "system-ui, -apple-system, sans-serif",
                              fontWeight: active ? 400 : 300,
                              textShadow: active
                                ? "0 0 10px #FF1493, 0 0 20px #FF1493"
                                : "0 0 5px #00FFFF",
                            }}
                          >
                            {beer.name}
                          </h3>
                          <p
                            className={active ? "text-cyan-300" : "text-slate-400"}
                            style={{ textShadow: active ? "0 0 5px #00FFFF" : "none" }}
                          >
                            {beer.type}, {beer.filtered}
                          </p>
                        </div>

                        <div className="text-right">
                          <div
                            className="text-4xl mb-1"
                            style={{
                              color: active ? "#FF1493" : "#00FFFF",
                              textShadow: active
                                ? "0 0 20px #FF1493, 0 0 40px #FF1493"
                                : "0 0 10px #00FFFF",
                            }}
                          >
                            {beer.price} ₽
                          </div>
                          <div
                            className="text-lg"
                            style={{
                              color: active ? "#00FFFF" : "#64748b",
                              textShadow: active ? "0 0 10px #00FFFF" : "none",
                            }}
                          >
                            {beer.abv}
                          </div>
                        </div>
                      </div>

                      {/* ВОТ ЭТО: появляется ТОЛЬКО на активной карточке */}
                      {active && (beer.recommend ?? true) && (
                        <div
                          className="mt-3 pt-3 recommendBox"
                          style={{
                            borderTop: "1px solid rgba(0,255,255,0.28)",
                            boxShadow: "0 -1px 10px rgba(0,255,255,0.18)",
                          }}
                        >
                          <div
                            className="flex items-center gap-2 text-cyan-200"
                            style={{ textShadow: "0 0 6px rgba(0,255,255,0.55)" }}
                          >
                            <span style={{ filter: `drop-shadow(0 0 6px ${accent})` }}>
                              ✨
                            </span>
                            <span>Рекомендуем попробовать прямо сейчас</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* dots */}
        <div className="flex justify-center gap-4 pb-6">
          {beers.map((_, index) => {
            const active = currentIndex === index;
            return (
              <button key={index} className="relative" onClick={() => goTo(index)}>
                <div
                  className={`h-3 rounded-full ${active ? "w-12" : "w-3"} transition-all duration-300`}
                  style={{
                    background: active
                      ? "linear-gradient(to right, #FF1493, #00FFFF, #0066FF)"
                      : "#00FFFF",
                    boxShadow: active ? "0 0 15px #FF1493, 0 0 30px #00FFFF" : "0 0 10px #00FFFF",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
