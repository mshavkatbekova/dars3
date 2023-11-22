import { useEffect, useState } from "react";
import Form from "./components/Form";
import ItemsList from "./components/ItemsList";
import { toast } from "react-toastify";

function getItemsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("items")) || [];
}

function getModeFromLocalStorage() {
  return localStorage.getItem("theme") || "light";
}

const themes = {
  light: "light",
  dark: "dark",
};

function App() {
  const [items, setItems] = useState(getItemsFromLocalStorage());
  const [currentTheme, setCurrenTheme] = useState(getModeFromLocalStorage());

  const handleTheme = () => {
    setCurrenTheme((prev) => {
      return prev === "dark" ? "light" : "dark";
    });
  };

  const deleteItem = (id) => {
    setItems((prev) => {
      return prev.filter((item) => item.id !== id);
    });
    toast.error("You deleted an item");
  };

  const chageCompleted = (id) => {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        } else {
          return item;
        }
      });
    });
    toast.info("You change completed");
  };

  const addNewItem = (newItem) => {
    setItems((prev) => {
      return [...prev, newItem];
    });
    toast.success("You add an item");
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    if (currentTheme === "light") {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
      
    }

    localStorage.setItem('theme', currentTheme)
  }, [items, currentTheme]);

  return (
    <div className="bg-slate-200 h-screen grid place-items-center  dark:bg-black">
      <div className="bg-white w-[520px] p-8 dark:bg-[#191717] dark:text-white">
        <div className="py-5">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              defaultChecked={currentTheme === 'light' ? false : true}
              onChange={handleTheme}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <h1 className="text-3xl text-center mb-8">Grocery Bud</h1>

        <Form addNewItem={addNewItem} />
        {items && (
          <ItemsList
            items={items}
            deleteItem={deleteItem}
            chageCompleted={chageCompleted}
          />
        )}
      </div>
    </div>
  );
}

export default App;
