## authRouter
-POST /signup
-POST /login
-POST /logout

## profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

## connectionRequestRouter
-POST /requested/send/interested/:userId
-POST /requested/send/ignored/:userId
-POST /requested/review/accepted/:userId
-POST /requested/review/rejected/:userId

## userRouter
-GET /user/connections
-GET /user/received/requests
-GET /user/feed {Get you the profile of other users on platform}
