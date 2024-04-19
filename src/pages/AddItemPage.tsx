import React, { useState } from "react";
import { Page, Button } from "zmp-ui";
import { useNavigate } from "zmp-ui";

const AddItemPage: React.FC = () => {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemImage, setItemImage] = useState<File | null>(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddItem = async () => {
    setIsLoading(true);
    try {
      const imageData = itemImage
        ? await convertImageToBase64(itemImage)
        : null; 
      const response = await fetch(
        "https://sachapi.totdep.com/thuctap/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: itemName,
            price: itemPrice,
            image: imageData,
          }), // Thêm trường hình ảnh vào dữ liệu gửi đi
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add item");
      }
      navigate("/list");
    } catch (error) {
      console.error("Error adding item:", error);
      setErrorMessage("Failed to add item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setItemImage(file);
    }
  };

  const convertImageToBase64 = (image: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(image);
    });
  };

  return (
    <Page className="page">
      <style>{}</style>
      <div className="section-container">
        <h2>Thêm Item</h2>
        <div>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Enter item name"
          />
        </div>
        <div>
          <input
            type="text"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            placeholder="Enter item price"
          />
        </div>
        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <Button onClick={handleAddItem} disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Item"}
        </Button>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      </div>
      <div className="section-container">
        <Button onClick={() => navigate("/list")}>Back to List</Button>
      </div>
    </Page>
  );
};

export default AddItemPage;
