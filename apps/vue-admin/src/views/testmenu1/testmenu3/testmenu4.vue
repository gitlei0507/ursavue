<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="地址组" name="addressgroup">
            <address-group ref="AddressGroupRef"></address-group>
        </el-tab-pane>
        <el-tab-pane label="端口组" name="portgroup">
            <port-address ref="PortGroupRef"></port-address>
        </el-tab-pane>
        <el-tab-pane label="例外IP组" name="exceptionIpGroup">
            <exception-ip-group ref="ExceptionIpGroupRef"></exception-ip-group>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
    import AddressGroup from '@/views/testmenu1/testmenu3/AddressGroup.vue';
    import ExceptionIpGroup from '@/views/testmenu1/testmenu3/ExceptionIpGroup.vue';
    import PortAddress from '@/views/testmenu1/testmenu3/PortAddress.vue';
    import { onMounted, ref } from 'vue';

    const activeName = ref('addressgroup')

    const AddressGroupRef = ref(null)
    const PortGroupRef = ref(null)
    const ExceptionIpGroupRef = ref(null)

    const refMap = new Map([
        ['addressgroup', AddressGroupRef],
        ['portgroup', PortGroupRef],
        ['exceptionIpGroup', ExceptionIpGroupRef]
    ]);

    const handleClick = (tab, event) => {
        //console.log(tab, event)
        // console.log('@@', tab.paneName);

        const targetRef = refMap.get(tab.paneName)
        targetRef.value.refresh()
    }


    onMounted(() => {
        refMap.get('addressgroup').value.refresh()
    })
</script>

<style>
    .demo-tabs>.el-tabs__content {
        padding: 32px;
        color: #6b778c;
        font-size: 32px;
        font-weight: 600;
    }
</style>
