import { Image } from "react-native";
import UserAvatar from "react-native-user-avatar";

const Avatar = ({ size, avatar }) => {
	return (
		<Image
			style={{ width: size, height: size, borderRadius: 50 }}
			source={{ uri: avatar }}
		/> 
	);
};

export default Avatar;