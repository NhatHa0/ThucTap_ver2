import React, { useState } from "react";
import { Page, Button } from "zmp-ui";
import { useNavigate, useParams } from "react-router-dom";

const DeleteItemPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDeleteItem = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://sachapi.totdep.com/thuctap/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      navigate("/list");
    } catch (error) {
      console.error("Error deleting item:", error);
      setErrorMessage("Failed to delete item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = () => {
    setIsConfirming(true);
  };

  const handleCancelDelete = () => {
    setIsConfirming(false);
  };

  return (
    <Page className="page">
      <div className="section-container">
        <h2>Delete Item</h2>
        <p>Are you sure you want to delete this item?</p>
        {isConfirming ? (
          <>
            <Button onClick={handleDeleteItem} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete Item"}
            </Button>
            <Button onClick={handleCancelDelete}>Cancel</Button>
          </>
        ) : (
          <Button onClick={handleConfirmDelete}>Confirm Delete</Button>
        )}
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      </div>
    </Page>
  );
};

export default DeleteItemPage;
