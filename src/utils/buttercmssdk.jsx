import Butter from "buttercms";

export let butterCMS;

try {
  const butterCmsPreview = !(
    import.meta.env.ASTRO_APP_BUTTER_CMS_PREVIEW === "false" ||
    import.meta.env.ASTRO_APP_BUTTER_CMS_PREVIEW === "0"
  );

  butterCMS = Butter(import.meta.env.PUBLIC_APITOKEN, butterCmsPreview);

  if (typeof window !== "undefined" && import.meta.env.PUBLIC_APITOKEN) {
    window.location.assign("/")
  }
} catch (error) {
  if (typeof window !== "undefined" && !import.meta.env.PUBLIC_APITOKEN) {
    window.location.assign("/404");
  }
}
