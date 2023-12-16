export function getObjects(client) {
  return client
    .from("dmg_objects_LDES")
    .select(
      "color_names, HEX_values, iiif_image_uris, CC_Licenses, attributions, objectNumber, LDES_raw, pattern",
      { head: false },
    )
    .not("color_names", "is", null);
  //return Promise.resolve([])
}
