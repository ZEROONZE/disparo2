import React, { useState } from "react";

interface IProduct {
  node: {
    nodee: {
      code: string;
      description: String;
      key: number;
      price?: number;
    };
  };
}

export const GetForm = () => {
  // const [text, setText] = useState<IProduct[]>();
  const [products, setProducts] = useState<IProduct[]>([
    {
      node: {
        nodee: {
          code: "",

          description: "",

          price: 90,
          key: Date.now(),
        },
      },
    },
  ]);

  const add = () => {
    setProducts((prevState) => [
      {
        city: { ...prevState },
        node: {
          nodee: {
            code: "",

            description: "",

            price: undefined,
            key: Date.now(),
          },
        },
      },
    ]);
  };

  const hundleInputChange = (
    key: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProducts((prevState) => {
      const newState = prevState.map((prodcut) => {
        if (prodcut.node.nodee.key === key) {
          return {
            ...prodcut,
            [event.target.name]: event.target.value,
          };
        }
        return prodcut;
      });
      return newState;
    });
  };

  const remover = (key: number) => {
    setProducts((prevState) =>
      prevState.filter((product) => product.node.nodee.key !== key)
    );
  };

  return (
    <div style={{ marginTop: "6rem" }}>
      {products.map((product, index) => (
        <div key={product.node.nodee.key}>
          {index + 1}
          <input
            type="text"
            placeholder="code"
            name="code"
            // value={text}
            onChange={(event) =>
              hundleInputChange(product.node.nodee.key, event)
            }
          />
          <input
            name="description"
            type="text"
            onChange={(event) =>
              hundleInputChange(product.node.nodee.key, event)
            }
          />
          <input
            type="text"
            name="price"
            onChange={(event) =>
              hundleInputChange(product.node.nodee.key, event)
            }
          />
          <button
            style={{ width: "10rem", background: "red", padding: "10px" }}
            onClick={() => remover(product.node.nodee.key)}
          >
            Delete
          </button>
        </div>
      ))}

      <button
        style={{ width: "10rem", background: "green", padding: "10px" }}
        onClick={add}
      >
        Add
      </button>
      <pre>
        <code
          style={{ flexDirection: "column", display: "flex", width: "200px" }}
        >
          {JSON.stringify(products, null, 2)}
        </code>
      </pre>
    </div>
  );
};
