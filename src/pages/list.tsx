import React, { useState, useEffect } from "react";
import { List, Page, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";

// Define a type for the items
interface Item {
  id: string;
  name: string;
  price: string;
  promotionPrice?: string | null; // Make promotionPrice optional
  createAt: string;
  updateAt: string;
  image: string; // Add image field
}

const ListPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItemsFromAPI();
  }, []);

  const fetchItemsFromAPI = async () => {
    try {
      const response = await fetch("https://sachapi.totdep.com/thuctap/read");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      // Convert images to base64
      const itemsWithBase64Image = await Promise.all(
        data.data.list.map(async (item: Item) => {
          const base64Image = await convertImageToBase64(item.image);
          return { ...item, image: base64Image };
        })
      );
      setItems(itemsWithBase64Image);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditItemClick = (itemId: string) => {
    navigate(`/edit-item/${itemId}`);
  };

  const handleAddButtonClick = () => {
    navigate("/add-item");
  };

  const handleDeleteItemClick = async (itemId: string) => {
    try {
      const response = await fetch(
        `https://sachapi.totdep.com/thuctap/${itemId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const convertImageToBase64 = (imageUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = reject;
      fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => reader.readAsDataURL(blob))
        .catch(reject);
    });
  };

  return (
    <Page className="page">
      <div className="section-container">
        <List>
          {items.map((item) => (
            <List.Item
              key={item.id}
              suffix={
                <>
                  <Button
                    onClick={() => handleEditItemClick(item.id)}
                    variant="outlined"
                    size="small"
                    style={{ marginRight: "8px" }}
                  >
                    Sửa
                  </Button>
                  <Button
                    onClick={() => handleDeleteItemClick(item.id)}
                    variant="outlined"
                    size="small"
                    style={{ marginRight: "8px" }}
                  >
                    Xóa
                  </Button>
                </>
              }
            >
              <div>
                <strong>ID:</strong> {item.id} <br />
                <strong>Name:</strong> {item.name} <br />
                <strong>Price:</strong> {item.price} <br />
                <strong>Promotion Price:</strong>{" "}
                {item.promotionPrice !== null ? item.promotionPrice : "N/A"}{" "}
                <br />
                <strong>Created At:</strong> {item.createAt} <br />
                <strong>Updated At:</strong> {item.updateAt} <br />
                <strong>Image:</strong>{" "}
                {item.image && <img src={item.image} alt="Item" />}{" "}
                {/* Display image if available */}
              </div>
            </List.Item>
          ))}
        </List>
      </div>
      <Button onClick={handleAddButtonClick}>Add</Button>
    </Page>
  );
};

export default ListPage;
