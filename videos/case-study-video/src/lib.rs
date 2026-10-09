//! Turbo Hub: twenty-second case-study film, using original product artwork.
use fframes::{
    AudioMap, Color, Duration, FFramesContext, Frame, Overlap, Scene, Scenes, Svgr, Video,
    animation::{AnimationRuntime, Easing},
    include_media_dir,
};
include_media_dir!(pub struct CaseStudyVideoMedia, "media");
pub const WIDTH: usize = 1920;
pub const HEIGHT: usize = 1080;
// From Turbo Hub/app-design-system/tokens/{primitives,semantics}.css.
const INK: &str = "#1b2940";
const MUTED: &str = "#64738b";
const BLUE: &str = "#1d86ff";
// The bundled Inter font's internal family name differs from its CSS alias.
const FONT: &str = "Inter Variable";

#[derive(Debug)]
struct Shot {
    kind: usize,
    seconds: f32,
    entrance: AnimationRuntime,
    exit: AnimationRuntime,
    drift: AnimationRuntime,
}
impl Shot {
    fn new(kind: usize, seconds: f32) -> Self {
        Self {
            kind,
            seconds,
            entrance: AnimationRuntime::new(0.65, &Easing::CubicBezier(0.16, 1., 0.3, 1.)),
            exit: AnimationRuntime::new(0.3, &Easing::EaseInOut),
            drift: AnimationRuntime::new(seconds, &Easing::EaseInOut),
        }
    }
    fn ease(runtime: &AnimationRuntime, t: f32) -> f32 {
        if t <= 0. {
            0.
        } else if t >= runtime.get_duration() {
            1.
        } else {
            runtime.solve(&t)
        }
    }
    fn image<'a>(
        &self,
        ctx: &FFramesContext<'a, '_>,
        name: &str,
        x: f32,
        y: f32,
        w: f32,
        h: f32,
    ) -> Svgr<'a> {
        let Some(image) = ctx.get_image(name) else {
            return Svgr::empty();
        };
        fframes::svgr!(<image href={image.href()} x={x} y={y} width={w} height={h} />)
    }
    fn phone<'a>(&self, ctx: &FFramesContext<'a, '_>, name: &str, scroll: f32) -> Svgr<'a> {
        let height = if name == "spends.png" {
            1436.
        } else if name == "members.png" {
            1153.
        } else {
            830.
        };
        fframes::svgr!(<g>
            <rect x="1198" y="123" width="440" height="854" rx="54" fill={INK} opacity="0.07" />
            <rect x="1186" y="109" width="440" height="854" rx="54" fill={INK} />
            <defs><clipPath id="screen"><rect x="1198" y="121" width="416" height="830" rx="43" /></clipPath></defs>
            <g clip-path="url(#screen)">
                <rect x="1198" y="121" width="416" height="830" fill="#fff" />
                {self.image(ctx, name, 1198., 121. - scroll, 416., height)}
            </g>
        </g>)
    }
}
impl Scene for Shot {
    fn name(&self) -> &'static str {
        [
            "Problem",
            "IntroducingTurboHub",
            "SpendingVisibility",
            "MemberBoundaries",
            "IndependentPayments",
            "Outcome",
        ][self.kind]
    }
    fn duration(&self) -> Duration<'_> {
        Duration::Seconds(self.seconds)
    }
    fn overlap(&self) -> Overlap {
        if self.kind == 0 {
            Overlap::None
        } else {
            Overlap::Previous(0.3)
        }
    }
    fn render_frame<'a>(&'a self, frame: Frame, ctx: &FFramesContext<'a, '_>) -> Svgr<'a> {
        let t = frame.seconds();
        let total = self.seconds + if self.kind == 0 { 0. } else { 0.3 };
        let enter = Self::ease(&self.entrance, t);
        let leave = if self.kind == 5 {
            0.
        } else {
            Self::ease(&self.exit, t - total + 0.3)
        };
        let opacity = if self.kind == 0 {
            1. - leave
        } else {
            enter * (1. - leave)
        };
        let rise = 36. * (1. - enter);
        let drift = Self::ease(&self.drift, t);
        let (label, line1, line2, detail) = match self.kind {
            0 => (
                "THE CHALLENGE",
                "Shared money.",
                "Different needs.",
                "Freedom needs boundaries.",
            ),
            1 => (
                "INTRODUCING TURBO HUB",
                "One family.",
                "One shared hub.",
                "Shared family money, inside PayZapp.",
            ),
            2 => (
                "01 / VISIBILITY",
                "See where",
                "money goes.",
                "Shared spending, in one place.",
            ),
            3 => (
                "02 / CONTROL",
                "Set clear",
                "boundaries.",
                "Member access and spending limits.",
            ),
            4 => (
                "03 / INDEPENDENCE",
                "Their money.",
                "Their way to pay.",
                "A payment experience of their own.",
            ),
            _ => (
                "THE INTENDED EXPERIENCE",
                "More freedom.",
                "Clear boundaries.",
                "Shared money that works for the family.",
            ),
        };
        let visual = match self.kind {
            0 | 5 => self.image(
                ctx,
                "family-home.png",
                1070.,
                235. - drift * 12.,
                680.,
                680.,
            ),
            1 | 2 => self.phone(
                ctx,
                "spends.png",
                if self.kind == 2 {
                    230. + drift * 140.
                } else {
                    0.
                },
            ),
            3 => self.phone(ctx, "members.png", drift * 95.),
            _ => self.phone(ctx, "payment-review.png", 0.),
        };
        fframes::svgr!(<g opacity={opacity} transform={format!("translate(0 {rise})")}>
            <text x="176" y="280" font-family={FONT} font-size="28" font-weight="600" letter-spacing="3" fill={MUTED}>{label}</text>
            <text x="170" y="430" font-family={FONT} font-size="104" font-weight="600" letter-spacing="-4" fill={INK}>{line1}</text>
            <text x="170" y="554" font-family={FONT} font-size="104" font-weight="600" letter-spacing="-4" fill={INK}>{line2}</text>
            <rect x="176" y="602" width="84" height="6" rx="3" fill={BLUE} />
            <text x="176" y="695" font-family={FONT} font-size="36" font-weight="400" fill={MUTED}>{detail}</text>
            {visual}
            <text x="176" y="842" font-family={FONT} font-size="28" font-weight="500" fill={BLUE}>
                {if self.kind == 0 { "PRODUCT DESIGN / FAMILY PAYMENTS" } else if self.kind == 5 { "TURBO HUB / PAYZAPP" } else { "MANAGER + MEMBER EXPERIENCE" }}
            </text>
        </g>)
    }
}
#[derive(Debug)]
pub struct CaseStudyVideoVideo {
    shots: [Shot; 6],
    title: String,
}
impl CaseStudyVideoVideo {
    pub fn new(_media: &CaseStudyVideoMedia, title: &str) -> Self {
        Self {
            shots: [
                Shot::new(0, 3.),
                Shot::new(1, 4.),
                Shot::new(2, 3.),
                Shot::new(3, 3.),
                Shot::new(4, 3.),
                Shot::new(5, 4.),
            ],
            title: title.to_owned(),
        }
    }
}
impl Video for CaseStudyVideoVideo {
    const FPS: usize = 30;
    const WIDTH: usize = WIDTH;
    const HEIGHT: usize = HEIGHT;
    const BACKGROUND_COLOR: Color = Color::WHITE;
    fn duration(&self) -> Duration<'_> {
        Duration::Auto
    }
    fn audio(&self) -> AudioMap<'_> {
        AudioMap::none()
    }
    fn define_scenes(&self) -> Scenes<'_> {
        Scenes::from(
            self.shots
                .iter()
                .map(|s| s as &dyn Scene)
                .collect::<Vec<_>>(),
        )
    }
    fn render_frame<'a>(&'a self, frame: Frame, ctx: &FFramesContext<'a, '_>) -> Svgr<'a> {
        let progress = 1568. * frame.seconds() / 20.;
        fframes::svgr!(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width={WIDTH} height={HEIGHT}>
            <defs><linearGradient id="chrome" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#1676e8" /><stop offset="0.55" stop-color="#4b59df" /><stop offset="1" stop-color="#6656d9" />
            </linearGradient></defs>
            <rect width="1920" height="1080" fill="#f5f8fd" />
            <rect x="1040" y="0" width="880" height="1080" fill="#eaf2ff" />
            <circle cx="1780" cy="250" r="560" fill="url(#chrome)" opacity="0.1" />
            <text x="176" y="84" font-family={FONT} font-size="34" font-weight="700" fill={INK}>{self.title.as_str()}</text>
            <text x="1744" y="84" text-anchor="end" font-family={FONT} font-size="28" font-weight="400" fill={MUTED}>"A family payments case study"</text>
            {ctx.render_scenes(&frame)}
            <rect x="176" y="998" width="1568" height="3" rx="1.5" fill="#e1e8f2" />
            <rect x="176" y="998" width={progress.max(0.5)} height="3" rx="1.5" fill={BLUE} />
        </svg>)
    }
}
