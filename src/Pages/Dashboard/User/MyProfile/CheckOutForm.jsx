import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckOutForm = ({ refetch, setOpen, totalPrice }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransectionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: totalPrice }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment Error", error);
      setError(error.message);
    } else {
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "Anonymous",
            name: user?.displayName || "Anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("Payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransectionId(paymentIntent.id);

        // save the payment info in the database
        const paymentInfo = {
          email: user.email,
          price: totalPrice,
          transectionId: paymentIntent.id,
        };
        axiosSecure.patch("/membership", paymentInfo).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              icon: "success",
              title: "Payment Successful",
              showConfirmButton: false,
              timer: 2500,
            });
            setOpen(false);
            refetch();
          }
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border p-4 rounded-md mt-4 py-6 shadow-sm">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <button
        className="bg-[var(--clr-focussed)] text-white px-4 py-2 rounded-md mt-4 shadow-sm w-full"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay Now
      </button>

      <p className="text-red-500 text-center mt-2">{error}</p>
      {transactionId && (
        <p className="text-green-600">Your transection id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckOutForm;
