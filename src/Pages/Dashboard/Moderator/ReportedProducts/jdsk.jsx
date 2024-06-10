<table className="w-full text-left table-auto min-w-max ">
          <thead>
            <tr className="font-normal border-b border-[var(--clr-light-gray)] bg-[var(--bg-secondary)] text-[var(--clr-primary)]">
              <th className="p-4">Product Name</th>
              <th className="p-4">Details</th>
              <th className="p-4">Delete</th>
            </tr>
          </thead>

          <tbody>
            {sortedProducts.length > 0 &&
              sortedProducts.map((product) => (
                <tr key={product._id} className="even:bg-blue-gray-50/50">
                  <td className="p-4">{product?.productName}</td>
                  {/* details field */}
                  <td className="p-4">
                    <Link to={`/details/${product._id}`}>
                      <button className="bg-[var(--bg-secondary)] px-2 py-[2px] rounded hover:scale-110 duration-500 font-semibold text-[12px]">
                        Details
                      </button>
                    </Link>
                  </td>
                  {/* Make featured */}
                  <td className="p-4">
                   {
                    product?.status === "accepted" ?  <button
                    className={`${
                      product?.featured
                        ? "bg-gray-200 text-[var(--clr-secondary)]"
                        : "bg-green-50 text-green-500 hover:scale-110"
                    } px-2 py-[2px] rounded duration-500 font-semibold text-[12px]`}
                    disabled={product?.featured}
                    onClick={() => handleMakeFeature(product._id)}
                  >
                    {product?.featured ? "Featured" : "Make Featured"}
                  </button> : ""
                   }
                  </td>
                </tr>
              ))}
          </tbody>
        </table>