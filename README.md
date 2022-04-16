### Requirements
<ul>
<li>Node js with version above or equal 14</li> 
<li>Npm</li> 
<li>Mysql</li> 
<li>Postman (Recommended)</li> 
<li>Nodemon (Recommended install globally)</li> 
<li>And all other dependecies can be installed via package.json</li>
</ul>

### How to start
<ul>
<li>Clone this reporsitory
<li>then npm install</li>
<li>Create database in local mysql name "UserJob", the tables will be auto migrated</li>
<li>Copy the .env.example to your .env file</li>
<li>after that, run with command nodemon server</li>
<li>If there is some problem while run nodemon server, delete node_modules then run npm update</li>
</ul>


### How To Use the API
<ul>
<li>Open Postman</li>
<li>Use API /api/register to insert user to database</li>
<li>Use API /api/login to get bearer token from POSTMAN response at the body</li>
<li>Use API /api/jobs/recruitment-positions?description=device&location=Remote&full_time=true to get list of jobs filtered by parameter at the headers</li>
<li>Put the bearer token into Authorization -> Type Bearer Token -> Paste to token form</li>
<li>Now you can use all api and fill the body with models schema</li>
</ul>

## Example Body in /api/register and output 

```shell
Input : 
{
    "name" : "hei",
    "password" : "hei"
}
Output 
{
    "user_id": 125,
    "name": "hei",
    "updatedAt": "2021-06-08T12:06:49.309Z",
    "createdAt": "2021-06-08T12:06:49.309Z"
}
```
## Emample Body in /api/login and output
## Copy the "token" below to access the api by inserting to bearer token at postman
``` shell
{
    "user_id" : 1,
    "name" : "testing",
    "password" : "testing"
}
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjgsIm5hbWUiOiJhc2VtIiwiaWF0IjoxNjIzMTU0MzcxLCJleHAiOjE2MjMxNTc5NzF9.Cxw075Vxs88u4ZvB-V9KlcHPBEaCHPX8yruA6wu4l-o",
    "expiresIn": 3600,
    "msg": {
        "user_id": 128,
        "name": "testing",
        "password": "$2b$10$5QVEH27KYrd/f8Rv2yCQqur1lRNr3fM87yf3gpHSNWdI1LSGDcMyu",
        "createdAt": "2021-06-08T12:12:38.000Z",
        "updatedAt": "2021-06-08T12:12:38.000Z"
    }
}
```
