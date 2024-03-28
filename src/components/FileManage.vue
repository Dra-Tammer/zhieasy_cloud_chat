<template>
  <div class="knowledgeFileManagementContainer">
    <div class="fileManagementTop">
      <vs-breadcrumb :items="[
        {
          title: 'knowledge',
        },
        {
          title: 'Link 1',
        },
        {
          title: 'Link 2',
        },
        {
          title: 'Active',
          active: true
        }
      ]"></vs-breadcrumb>
      <div class="fileManagementTopButtonContainer">
        <vs-button style="margin-right: 20px;" size="small" type="flat">新建文件夹</vs-button>
        <vs-button size="small" type="flat">上传文件</vs-button>
      </div>
    </div>
    <div class="fileListContainer">
      <vs-table :data="users" maxHeight="100vh" search>
        <template slot="thead">
          <vs-th style="width: 20px;">
          </vs-th>
          <vs-th>
            文件名
          </vs-th>
          <vs-th>
            修改日期
          </vs-th>
          <vs-th>
            类型
          </vs-th>
          <vs-th>
            大小
          </vs-th>
          <vs-th>
            操作
          </vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td>
              <img src="./file/dir.png" style="width: 22px;height: 22px;">
            </vs-td>
            <vs-td :data="data[indextr].email">
              {{ data[indextr].email }}
            </vs-td>

            <vs-td :data="data[indextr].username">
              {{ data[indextr].name }}
            </vs-td>

            <vs-td :data="data[indextr].id">
              {{ data[indextr].id }}
            </vs-td>
            <vs-td>
              <vs-td :data="data[indextr].website">
                {{ data[indextr].website }}
              </vs-td>
            </vs-td>
            <vs-td>
              <vs-button size="small" type="flat" color="danger">删除</vs-button>

            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>


<script>
export default {
  name: 'FileManage',
  data() {
    return {
      knowledgeId: '',
      breadCrumbItem: [
        {
          title: 'knowledge',
        },
        {
          title: 'Link 1',
        },
        {
          title: 'Link 2',
        },
        {
          title: 'Active',
          active: true
        }
      ],
      users: [
        {
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
          "website": "hildegard.org",
        },
        {
          "id": 2,
          "name": "Ervin Howell",
          "username": "Antonette",
          "email": "Shanna@melissa.tv",
          "website": "anastasia.net",
        },
        {
          "id": 3,
          "name": "Clementine Bauch",
          "username": "Samantha",
          "email": "Nathan@yesenia.net",
          "website": "ramiro.info",
        },
        {
          "id": 4,
          "name": "Patricia Lebsack",
          "username": "Karianne",
          "email": "Julianne.OConner@kory.org",
          "website": "kale.biz",
        },
        {
          "id": 5,
          "name": "Chelsey Dietrich",
          "username": "Kamren",
          "email": "Lucio_Hettinger@annie.ca",
          "website": "demarco.info",
        },
        {
          "id": 6,
          "name": "Mrs. Dennis Schulist",
          "username": "Leopoldo_Corkery",
          "email": "Karley_Dach@jasper.info",
          "website": "ola.org",
        },
        {
          "id": 7,
          "name": "Kurtis Weissnat",
          "username": "Elwyn.Skiles",
          "email": "Telly.Hoeger@billy.biz",
          "website": "elvis.io",
        },
        {
          "id": 8,
          "name": "Nicholas Runolfsdottir V",
          "username": "Maxime_Nienow",
          "email": "Sherwood@rosamond.me",
          "website": "jacynthe.com",
        },
        {
          "id": 9,
          "name": "Glenna Reichert",
          "username": "Delphine",
          "email": "Chaim_McDermott@dana.io",
          "website": "conrad.com",
        },
        {
          "id": 10,
          "name": "Clementina DuBuque",
          "username": "Moriah.Stanton",
          "email": "Rey.Padberg@karina.biz",
          "website": "ambrose.net",
        },
        {
          "id": 11,
          "name": "Clementina DuBuque",
          "username": "Moriah.Stanton",
          "email": "Rey.Padberg@karina.biz",
          "website": "ambrose.net",
        },
        {
          "id": 12,
          "name": "Clementina DuBuque",
          "username": "Moriah.Stanton",
          "email": "Rey.Padberg@karina.biz",
          "website": "ambrose.net",
        },
        {
          "id": 13,
          "name": "Clementina DuBuque",
          "username": "Moriah.Stanton",
          "email": "Rey.Padberg@karina.biz",
          "website": "ambrose.net",
        },
        {
          "id": 14,
          "name": "Clementina DuBuque",
          "username": "Moriah.Stanton",
          "email": "Rey.Padberg@karina.biz",
          "website": "ambrose.net",
        },
        {
          "id": 15,
          "name": "Clementina DuBuque",
          "username": "Moriah.Stanton",
          "email": "Rey.Padberg@karina.biz",
          "website": "ambrose.net",
        },
        {
          "id": 16,
          "name": "Clementina DuBuque",
          "username": "Moriah.Stanton",
          "email": "Rey.Padberg@karina.biz",
          "website": "ambrose.net",
        },
        {
          "id": 17,
          "name": "Clementina DuBuque",
          "username": "Moriah.Stanton",
          "email": "Rey.Padberg@karina.biz",
          "website": "ambrose.net",
        }
      ]
    }
  },
  created() {
    let path = this.$route.path.split('/')
    this.knowledgeId = path[path.length - 1]
    this.$watch(
        () => this.$route.params,
        (toParams, preParams) => {
          console.log(preParams)
          this.knowledgeId = toParams.id
        }
    )
  },
  methods: {},
}
</script>

<style lang="css" scoped>
.knowledgeFileManagementContainer {
  height: 100%;
  width: 100%;
}

.fileManagementTop {
  height: 4%;
  border-bottom: 1px solid #c7c7c7;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fileManagementTopButtonContainer {
  margin-right: 20px;
}

.fileListContainer {
  padding-top: 4px;
  background-color: rgb(251, 251, 251);
}
</style>
