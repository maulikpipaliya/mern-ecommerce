import { EMPTY_STATE } from "../constants/masterConstants";

export const masterReducer = (state = {}, action) => {
    switch (action.type) {
        case EMPTY_STATE:
            return {};

        default:
            return state;
    }
};
