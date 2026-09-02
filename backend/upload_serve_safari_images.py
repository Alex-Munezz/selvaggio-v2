import os
import requests


API_URL = "http://127.0.0.1:5000"

TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc4ODMzNjA0MiwianRpIjoiMDBlODA1YjEtOTRhYS00OTk3LWEyNzktNjhiZTcwOTBmOWZmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjMiLCJuYmYiOjE3ODgzMzYwNDIsImNzcmYiOiI4MGUyYTAyNS02NTg4LTQ5ZTgtYTkzMC03MWQ4ZGM5YWJlOGIiLCJleHAiOjE3ODgzNjQ4NDIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5Ac2VsdmFnZ2lvc2FmYXJpcy5jb20ifQ.EX4pwLzGzgRjLjUq22AUivgkYdqpM7a1uQhnP3uMkRQ"

IMAGE_FOLDER = "serve_safari_images"


headers = {
    "Authorization": f"Bearer {TOKEN}",
}


# Fetch only active Serve & Safari packages
response = requests.get(
    f"{API_URL}/api/packages",
    params={
        "category": "serve-and-safari",
        "active": "true",
    },
)

response.raise_for_status()

data = response.json()

packages = (
    data
    if isinstance(data, list)
    else (
        data.get("packages")
        or data.get("items")
        or data.get("data")
        or []
    )
)


print(
    f"Found {len(packages)} "
    "Serve & Safari packages"
)


serve_safari_packages = {
    str(package["slug"]).strip().lower(): package
    for package in packages
}


for filename in os.listdir(IMAGE_FOLDER):

    if not filename.lower().endswith(
        (
            ".jpg",
            ".jpeg",
            ".png",
            ".webp",
        )
    ):
        continue

    slug = (
        os.path.splitext(filename)[0]
        .strip()
        .lower()
    )

    package = serve_safari_packages.get(slug)

    if not package:
        print(
            f"\n⏭️ Skipping {filename}"
        )
        print(
            f"   No Serve & Safari package "
            f"found with slug: {slug}"
        )
        continue

    name = package["name"]

    image_path = os.path.join(
        IMAGE_FOLDER,
        filename,
    )

    print(
        f"\n📸 Uploading image for {name}..."
    )

    # Upload image to Cloudinary
    with open(image_path, "rb") as image_file:

        upload_response = requests.post(
            f"{API_URL}/api/admin/uploads/image",
            headers=headers,
            files={
                "image": image_file,
            },
            data={
                "folder": "serve-and-safari",
            },
        )

    if upload_response.status_code != 201:

        print(
            f"❌ Cloudinary upload failed "
            f"for {name}:"
        )

        print(upload_response.text)

        continue

    upload_data = upload_response.json()

    image_url = upload_data["url"]

    print(
        f"✅ Cloudinary: {image_url}"
    )

    # Save Cloudinary URL to package
    update_response = requests.patch(
        f"{API_URL}/api/packages/{slug}",
        headers=headers,
        json={
            "image": image_url,
        },
    )

    if update_response.ok:

        print(
            f"✅ {name} updated successfully"
        )

    else:

        print(
            f"❌ Failed to update {name}:"
        )

        print(
            update_response.status_code,
            update_response.text,
        )


print(
    "\n🔥 Serve & Safari images finished."
)