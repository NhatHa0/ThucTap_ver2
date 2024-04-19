import React, { useState, useEffect } from "react";
import { List, Page, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import "../css/ListPage.css";

interface Item {
  id: string;
  name: string;
  price: string;
  promotionPrice: string | null;
  createAt: string;
  updateAt: string;
  image: string;
}

const ListPage: React.FC = () => {
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
      const itemsData: Item[] = data.data.list.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        promotionPrice: item.promotionPrice || null,
        createAt: item.createAt,
        updateAt: item.updateAt,
        image: item.image,
      }));
      setItems(itemsData);
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

  function formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }

  return (
    <Page className="list-page">
      <h1 className="title">Danh sách</h1>
      <List className="list">
        {items.map((item) => (
          <List.Item className="item-list" key={item.id}>
            <div className="item">
              <strong>ID:</strong> {item.id} <br />
              <strong>Name:</strong> {item.name} <br />
              <strong>Price:</strong> {formatCurrency(item.price)} <br />
              <strong>Promotion Price:</strong>{" "}
              {item.promotionPrice !== null ? item.promotionPrice : "N/A"}{" "}
              <br />
              <strong>Created At:</strong> {item.createAt} <br />
              <strong>Updated At:</strong> {item.updateAt} <br />
              <strong>Image:</strong>{" "}
              {item.image && <img src={item.image} alt="Item" />}{" "}
              {/* Display image if available */}
            </div>
            <div className="item-buttons">
              <Button
                className="item-button"
                onClick={() => handleEditItemClick(item.id)}
                size="small"
                style={{ marginRight: "30px" }}
              >
                Sửa
              </Button>
              <Button
                className="item-button"
                onClick={() => handleDeleteItemClick(item.id)}
                size="small"
                style={{ marginRight: "30px" }}
              >
                Xóa
              </Button>
            </div>
          </List.Item>
        ))}
      </List>
      <div className="section-container-list">
        <Button className="button" onClick={handleAddButtonClick}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
              ></path>
            </svg>{" "}
            Thêm
          </span>
        </Button>
      </div>
    </Page>
  );
};

export default ListPage;
