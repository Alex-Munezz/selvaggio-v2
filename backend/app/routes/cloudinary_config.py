import os

import cloudinary
import cloudinary.uploader

from flask import Blueprint, request
from app.routes.admin_auth import staff_required


uploads_bp = Blueprint(
    "uploads",
    __name__,
    url_prefix="/api/admin/uploads",
)


cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True,
)


ALLOWED_FOLDERS = {
    "packages",
    "destinations",
    "vehicles",
    "serve-and-safari",
}

ALLOWED_EXTENSIONS = {
    "jpg",
    "jpeg",
    "png",
    "webp",
}


def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower()
        in ALLOWED_EXTENSIONS
    )


@uploads_bp.route("/image", methods=["POST"])
@staff_required
def upload_image():
    image = request.files.get("image")

    if not image:
        return {
            "error": "No image was provided"
        }, 400

    if not image.filename:
        return {
            "error": "Image filename is missing"
        }, 400

    if not allowed_file(image.filename):
        return {
            "error": "Unsupported image format",
            "allowed_formats": sorted(ALLOWED_EXTENSIONS),
        }, 400

    folder = request.form.get(
        "folder",
        "packages",
    ).strip()

    if folder not in ALLOWED_FOLDERS:
        return {
            "error": "Invalid image folder",
            "allowed_folders": sorted(
                ALLOWED_FOLDERS
            ),
        }, 400

    try:
        result = cloudinary.uploader.upload(
            image,
            folder=f"selvaggio/{folder}",
            resource_type="image",
            use_filename=True,
            unique_filename=True,
            overwrite=False,
        )

        return {
            "message": "Image uploaded successfully",
            "url": result["secure_url"],
            "public_id": result["public_id"],
            "width": result.get("width"),
            "height": result.get("height"),
            "format": result.get("format"),
            "bytes": result.get("bytes"),
        }, 201

    except Exception as error:
        print(
            "Cloudinary upload error:",
            error,
        )

        return {
            "error": "Unable to upload image"
        }, 500