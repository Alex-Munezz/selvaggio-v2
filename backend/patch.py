import requests


API_URL = "http://127.0.0.1:5000"

TOKEN = "PASTE_YOUR_ADMIN_TOKEN_HERE"


# Images already uploaded to Cloudinary
IMAGE_URLS = {
    79: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339892/selvaggio/packages/image_uq7qwo.png",
    77: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339893/selvaggio/packages/image_yetibl.png",
    84: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339894/selvaggio/packages/image_y0ymcp.png",
    78: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339895/selvaggio/packages/image_fxevfb.png",
    83: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339896/selvaggio/packages/image_ae0f7y.png",
    88: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339897/selvaggio/packages/image_cxwl5w.png",
    99: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339898/selvaggio/packages/image_jm9pt1.png",
    94: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339899/selvaggio/packages/image_eazpqy.png",
    97: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339900/selvaggio/packages/image_qzngsj.png",
    80: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339901/selvaggio/packages/image_beflie.png",
    92: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339902/selvaggio/packages/image_klsffo.png",
    87: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339903/selvaggio/packages/image_hch1no.png",
    81: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339904/selvaggio/packages/image_gqv0uz.png",
    86: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339906/selvaggio/packages/image_wccjxl.png",
    90: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339908/selvaggio/packages/image_fzwnjq.png",
    85: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339909/selvaggio/packages/image_tcpxda.png",
    82: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339909/selvaggio/packages/image_l9djhd.png",
    96: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339911/selvaggio/packages/image_mrx4od.png",
    95: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339913/selvaggio/packages/image_hwaxdv.png",
    89: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339914/selvaggio/packages/image_ui9nrs.png",
    93: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339915/selvaggio/packages/image_piklkb.png",
    100: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339916/selvaggio/packages/image_kprqvc.png",
    98: "https://res.cloudinary.com/kn3xfg1b/image/upload/v1788339918/selvaggio/packages/image_pljuju.png",
}


headers = {
    "Authorization": f"Bearer {TOKEN}",
}


# Get all packages so we can convert ID -> slug
response = requests.get(
    f"{API_URL}/api/packages"
)

response.raise_for_status()

data = response.json()

# Support either:
# [...]
# or {"packages": [...]}
packages = (
    data
    if isinstance(data, list)
    else data.get("packages", [])
)


package_by_id = {
    int(package["id"]): package
    for package in packages
}


for package_id, image_url in IMAGE_URLS.items():

    package = package_by_id.get(package_id)

    if not package:
        print(
            f"❌ Package ID {package_id} not found"
        )
        continue

    slug = package["slug"]
    name = package["name"]

    print(
        f"\nUpdating {name}"
    )

    print(
        f"Slug: {slug}"
    )

    update_response = requests.patch(
        f"{API_URL}/api/packages/{slug}",
        headers=headers,
        json={
            "image": image_url
        },
    )

    if update_response.ok:
        print(
            f"✅ Updated {name}"
        )
    else:
        print(
            f"❌ Failed {name}:",
            update_response.status_code,
            update_response.text,
        )


print("\n🔥 Package image patching finished.")