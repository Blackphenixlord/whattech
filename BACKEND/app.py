from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from any origin (needed for React frontend)

@app.route("/")
def home():
    return "Flask AI Backend is running!"

@app.route("/analyze", methods=["POST"])
def analyze():
    """
    This endpoint receives a base64 image from the frontend,
    and returns an AI description.
    """
    try:
        data = request.get_json()
        image_base64 = data.get("imageBase64")

        if not image_base64:
            return jsonify({"description": "No image provided."}), 400

        # 🔹 Here you would integrate Llama 4 or your AI model.
        # For now, we return a dummy description.
        description = "This is a dummy AI description for your image."

        return jsonify({"description": description})
    except Exception as e:
        return jsonify({"description": f"Error: {str(e)}"}), 500

if __name__ == "__main__":
    # Runs on all addresses so your phone/emulator can access it
    app.run(host="0.0.0.0", port=5000, debug=True)
