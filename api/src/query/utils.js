import pool from '../db/pool';
import twitter from './twitter';
import outlook from './outlook';
import trello from './trello';

const getActionsFromUser = (userId, serviceId) => {
	return pool.query("SELECT actions.id, action_types.nom, actions.fk_users FROM actions JOIN action_types on action_types.id = actions.fk_types WHERE fk_users = $1 AND fk_services = $2", [userId, serviceId]).then((res) => {
		return (res.rows)
	}).catch((err) => {
		return (null)
	})
}

const getReactionsFromAction = (actionId) => {
	return pool.query("SELECT reactions.id, reaction_types.nom AS reactionname, fk_users, reactions.param, reaction_types.fk_services, service_list.nom AS servicename FROM reactions JOIN reaction_types on reaction_types.id = reactions.fk_types JOIN service_list ON service_list.id = reaction_types.fk_services WHERE fk_actions = $1", [actionId]).then((res) => {
		return (res.rows)
	}).catch((err) => {
		return (null)
	})
}

const execReactionTwitter = (reactionName, param) => {
	if (reactionName === "Tweet X") {
		console.log("Reaction: " + reactionName + " executed.");
		let messageToSend = param;
		twitter.sendTweetReaction(messageToSend + " " + Math.random().toString(36).substring(7));
	}
}

const execReactionOutlook = (reactionName, data) => {
	console.log("reaction Outloook", data)
	if (reactionName == "Mail X") {
		if (data.param.indexOf("::") !== -1) {
			let tmp = data.param.split("::")
			console.log(tmp)
			outlook.sendNewMail(data.fk_users, tmp[0], tmp[1])
		} else {
			outlook.sendNewMail(data.fk_users, data.param, "Area has sent you a new message")
		}
	}
}

const execReactionTrello = (reactionName, data) => {
	console.log("reaction Trello", data)
	if (reactionName == "Add List X to Board X") {
		if (data.param.indexOf("::") !== -1) {
			let tmp = data.param.split("::")
			trello.addListBoard(data.fk_users, tmp[1], tmp[0])
		} else {
			trello.addListBoard(data.fk_users, data.param, "Area has sent you a new message")
		}
	} else if (reactionName === "Add Card to List X from Board X") {
		if (data.param.indexOf("::") !== -1) {
			let tmp = data.param.split("::")
			trello.addCardBoard(data.fk_users, tmp[1], tmp[0], 'Area has sent you a new message')
		} else {
			trello.addCardBoard(data.fk_users, data.param, null, null, '')
		}
	}
}

const execGoodReaction = (resultFromReaction) => {
	resultFromReaction.map((data) => {
		console.log(data);
		if (data.servicename === "twitter") {
			execReactionTwitter(data.reactionname, data.param)
		} else if (data.servicename === "outlook") {
			execReactionOutlook(data.reactionname, data)
		} else if (data.servicename === "trello") {
			execReactionTrello(data.reactionname, data)
		}
	})
}


export default {
	getActionsFromUser,
	getReactionsFromAction,
	execReactionTwitter,
	execGoodReaction
}