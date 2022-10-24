import Butter from 'buttercms';

export let butterCMS;

try {
    const butterCmsPreview = !(import.meta.env.ASTRO_APP_BUTTER_CMS_PREVIEW === "false" || import.meta.env.ASTRO_APP_BUTTER_CMS_PREVIEW === "0")

    butterCMS = Butter(import.meta.env.PUBLIC_APITOKEN, butterCmsPreview);
} catch (error) {
    console.error(error)
}

