import { getUserDetail } from "../helpers/getUserDetail.js"

const userDetailsUsingToken = async (req, res) => {
    try {
        const token = req.cookies.token || ""

        const user = await getUserDetail(token)

        return res.status(200).json({
            message: "User Data",
            data: user,
            success : true
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true
        })
    }
}

export default userDetailsUsingToken