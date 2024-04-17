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
      setItems(data.data.list || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditItemClick = (itemId: string) => {
    navigate(`/edit-item/${itemId}`); // Truyền ID vào URL khi bấm vào nút "Sửa"
  };

  const handleAddButtonClick = () => {
    navigate("/add-item");
  };

  return (
    <Page className="page">
      <div className="section-container">
        <List>
          {items.map((item) => (
            <List.Item
              key={item.id}
              suffix={
                <Button
                  onClick={() => handleEditItemClick(item.id)} // Truyền ID vào hàm xử lý khi bấm nút "Sửa"
                  variant="outlined"
                  size="small"
                  style={{ marginRight: "8px" }}
                >
                  Sửa
                </Button>
              }
            >
              <div>
                <strong>ID:</strong> {item.id} <br /> {/* Thêm cột ID */}
                <strong>Name:</strong> {item.name} <br />
                <strong>Price:</strong> {item.price} <br />
                <strong>Promotion Price:</strong>{" "}
                {item.promotionPrice !== null ? item.promotionPrice : "N/A"}{" "}
                <br />
                <strong>Created At:</strong> {item.createAt} <br />
                <strong>Updated At:</strong> {item.updateAt}
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
