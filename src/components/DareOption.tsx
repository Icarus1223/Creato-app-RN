import {useMemo} from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import { DonutIconSvg, UserGroupIconSvg, VoteIconSvg } from "../assets/svg";

const DareOption = ({ title, username, onPress, voteInfo }) => {
	const totalDonuts = useMemo(() => {
	    if(voteInfo) {
		    return voteInfo.reduce((count, current) => {
		      return count + current.amount;
		    }, 0);
		} return 0
	}, [voteInfo]);

	const totalVoters = useMemo(() => {
	    if(voteInfo) {
		    const voters = new Set();
		    voteInfo.forEach((vote) => {
		      voters.add(vote.voter);
		    });
		    return voters.size;
		} return 0;
	}, [voteInfo]);

	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.container}>
				<View style={{ justifyContent: 'center', flexDirection: 'row' }}>
					<View style={styles.optionTitle}>
						<Text style={styles.optionText}>{title}</Text>
					</View>
					<View style={styles.voteStatus}>
					{(title && title.indexOf('Dare Option') === -1) &&
						<SvgXml xml={VoteIconSvg} />
					}
					</View>
				</View>
			</View>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 1, marginHorizontal: 2, alignItems: 'center' }}>
				<View style={{ flexDirection: 'row' }}>
					<View style={{ flexDirection: 'row' }}>
						<SvgXml xml={DonutIconSvg('#54504E')} />
						<Text style={styles.voteInfoText}>{totalDonuts.toLocaleString()}</Text>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
						<SvgXml xml={UserGroupIconSvg('#54504E')} />
						<Text style={styles.voteInfoText}>{totalVoters.toLocaleString()}</Text>
					</View>
				</View>
				{username &&
					<View style={styles.username}>
						<Text style={styles.usernameText}>by {username}</Text>
					</View>
				}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 304,
		backgroundColor: '#F5F5F4',
		height: 80,
		borderRadius: 10,
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	optionTitle: {
		flexDirection: 'column',
		justifyContent: 'center',
		height: 60,
		width: 230
	},
	voteStatus: {
		width: 40,
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	voteInfoText: {
		marginLeft: 3,
		fontSize: 14,
		lineHeight: 16,
		fontWeight: 'bold',
		color: '#54504E'
	},
	optionText: {
		fontSize: 16,
		lineHeight: 20,
		fontWeight: 400
	},
	usernameText: {
		fontSize: 12,
		lineHeight: 14,
		fontWeight: 400
	}
})

export default DareOption;