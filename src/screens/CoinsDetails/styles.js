import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    iconView: {
        marginTop: 10,
        flexDirection: 'row',

        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mid: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    symbol: {
        color: 'white',
        fontWeight: 'bold',
        marginHorizontal: 6,
        fontSize: 16
    },
    price: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 2
    },
    names: {
        color: 'white',
        fontSize: 15
    },
    input: {
        flex: 1,

        height: 40,
        margin: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        padding: 10,
        fontSize: 16,
        color: 'white',

    },
    timeFilterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#2b2b2b',
        paddingVertical: 5,
        borderRadius: 5,
        marginVertical: 10,
        marginBottom: 20

    },
    candlelabel: {
        color: 'grey',
        fontSize: 13
    },
    buttonText: {

        fontSize: 17,
        fontWeight: '600'
    },
    buttonContainer: {

        padding: 10,
        alignItems: 'center',
        marginVertical: 30,
        marginHorizontal: 25,
        borderRadius: 5
    },


});

export default styles;