import os
import requests


API_URL = "http://127.0.0.1:5000"

TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc4ODMzNjA0MiwianRpIjoiMDBlODA1YjEtOTRhYS00OTk3LWEyNzktNjhiZTcwOTBmOWZmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjMiLCJuYmYiOjE3ODgzMzYwNDIsImNzcmYiOiI4MGUyYTAyNS02NTg4LTQ5ZTgtYTkzMC03MWQ4ZGM5YWJlOGIiLCJleHAiOjE3ODgzNjQ4NDIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5Ac2VsdmFnZ2lvc2FmYXJpcy5jb20ifQ.EX4pwLzGzgRjLjUq22AUivgkYdqpM7a1uQhnP3uMkRQ"

IMAGE_FOLDER = "destination_images"


headers = {
    "Authorization": f"Bearer {TOKEN}",
}


# Fetch destinations first
response = requests.get(
    f"{API_URL}/api/destinations"
)

response.raise_for_status()

destinations = response.json()

destination_by_id = {
    int(destination["id"]): destination
    for destination in destinations
}


for filename in os.listdir(IMAGE_FOLDER):

    if not filename.lower().endswith(
        (".jpg", ".jpeg", ".png", ".webp")
    ):
        continue

    destination_id = os.path.splitext(
        filename
    )[0]

    if not destination_id.isdigit():
        print(
            f"⏭️ Skipping {filename}: "
            "filename must be destination ID"
        )
        continue

    destination_id = int(destination_id)

    destination = destination_by_id.get(
        destination_id
    )

    if not destination:
        print(
            f"❌ Destination ID "
            f"{destination_id} not found"
        )
        continue

    name = destination["name"]

    image_path = os.path.join(
        IMAGE_FOLDER,
        filename
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
                "image": image_file
            },
            data={
                "folder": "destinations"
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

    # Save Cloudinary URL to destination
    update_response = requests.patch(
        f"{API_URL}/api/destinations/"
        f"{destination_id}",
        headers=headers,
        json={
            "image": image_url
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
    "\n🔥 Destination image upload finished."
)