type NotificationProps = {
	message?: string;
};

const Notification = ({ message }: NotificationProps) => {
	const style = {
		color: "red",
	};

	if (message) {
		return <div style={style}>{message}</div>;
	} else {
		return null;
	}
};

export default Notification;
