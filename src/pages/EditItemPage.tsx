import React, { useState } from "react";
import { Page, Button } from "zmp-ui";
import { useNavigate } from "zmp-ui";

const AddItemPage: React.FC = () => {
  const navigate = useNavigate();
  const [itemId, setItemId] = useState(""); // Thêm state để lưu ID
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddItem = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://sachapi.totdep.com/thuctap/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: itemId,
            name: itemName,
            price: itemPrice,
          }), // Thêm trường giá vào dữ liệu gửi đi
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

  return (
    <Page className="page">
      <div className="section-container">
        <h2>Sửa Item</h2>
        <div>
          <input
            type="text"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)} // Thêm onChange để cập nhật giá trị ID
            placeholder="Enter item ID" // Thêm placeholder cho input ID
          />
        </div>
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
