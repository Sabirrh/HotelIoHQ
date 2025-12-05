import { Modal } from "antd";

const OrderModal = ({ session, orderBy, showModal, setShowModal }) => {
  if (!session || !orderBy) return null;

  // Extract simple fields safely
  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id || "N/A";

  const paymentStatus =
    session.payment_status || session.status || "N/A";

  const amountTotal = session.amount_total || session.amount || 0;
  const currency = session.currency?.toUpperCase() || "USD";

  return (
    <Modal
      visible={showModal}
      title="Order Payment Info"
      onCancel={() => setShowModal(!showModal)}
    >
      <p>Payment intent ID: {paymentIntentId}</p>
      <p>Payment Status: {paymentStatus}</p>
      <p>
        Amount total: {currency} {amountTotal / 100}
      </p>
      <p>Stripe customer id: {session.customer || "N/A"}</p>
      <p>Customer: {orderBy.name}</p>

      {/* Optional: for debugging nested objects */}
      {/* <pre>{JSON.stringify(session.payment_intent, null, 2)}</pre> */}
    </Modal>
  );
};

export default OrderModal;

