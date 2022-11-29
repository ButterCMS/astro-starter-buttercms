import Butter from "buttercms";

export let butterCMS;

try {
  const butterCmsPreview = !(
    import.meta.env.ASTRO_APP_BUTTER_CMS_PREVIEW === "false" ||
    import.meta.env.ASTRO_APP_BUTTER_CMS_PREVIEW === "0"
  );

  butterCMS = Butter(import.meta.env.ASTRO_APP_BUTTER_CMS_API_KEY, butterCmsPreview);

  if (typeof window !== "undefined" && import.meta.env.ASTRO_APP_BUTTER_CMS_API_KEY) {
    window.location.assign("/")
  }
} catch (error) {
  if (typeof window !== "undefined" && !import.meta.env.ASTRO_APP_BUTTER_CMS_API_KEY) {
    window.location.assign("/404");
  }
}
