import React from "react";
import { brandLogosList } from "../../static/data";

const SponsoredBrands = () => {
  const loopLogos = [...brandLogosList, ...brandLogosList];

  return (
    <section className="w-full bg-slate-100/80 py-16 sm:py-20 md:py-24 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-5">
        <div className="text-center mb-14 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500 mb-4">
            Trusted Partners
          </p>
          <h2 className="text-3xl font-medium text-slate-900">
            Sponsored Brands
          </h2>
          <div className="w-18 h-0.5 bg-slate-500/70 mx-auto mt-6 mb-8" />
          <p className="text-slate-600 text-lg max-w-3xl mx-auto font-light">
            Partnering with world-class brands to bring you exceptional quality
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-32 bg-linear-to-r from-slate-100/90 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-32 bg-linear-to-l from-slate-100/90 to-transparent z-10" />

          {/* seamless infinite logo loop */}
          <div className="sponsored-marquee">
            <div className="sponsored-track items-center gap-6 sm:gap-8 py-3 pr-8">
              {loopLogos.map((logo, index) => (
                <div
                  key={`${logo}-${index}`}
                  className="h-20 min-w-28 sm:min-w-36 px-5 rounded-xl bg-white/85 border border-slate-200 shadow-sm flex items-center justify-center"
                >
                  <img
                    src={logo}
                    alt={`Brand ${index + 1}`}
                    className="max-h-12 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* </div> */}

        <p className="text-center text-slate-500 text-sm font-light mt-14">
          And many more trusted brands in our network
        </p>
      </div>
    </section>
  );
};

export default SponsoredBrands;
