import { DvaModelBuilder, actionCreatorFactory } from 'dva-model-creator';
import { WarehouseServiceProxy as ServiceProxy, PagedResultDtoOfWarehouseDto, WarehouseDto } from "../../../../services/service-proxies";
const namespace = "warehouse";

export interface WarehouseProps {
    list?: WarehouseDto[],
    entity?: WarehouseDto
    openModal?: boolean
}

const actionCreator = actionCreatorFactory(namespace);
const updateState = actionCreator<WarehouseProps>('updateState');
const query = actionCreator('query');
const get = actionCreator<{ id: string }>('get');
const create = actionCreator<WarehouseDto>('create');
const update = actionCreator<WarehouseDto>('update');
const deleteAction = actionCreator<{ id: string }>('delete');

const model = new DvaModelBuilder<WarehouseProps>({ list: [], openModal: false }, namespace)
    .case(updateState, (state, payload) => {
        return { ...state, ...payload };
    })

    .takeEvery(query, function* (_payload, { put }) {
        let service = new ServiceProxy();
        const categorys: PagedResultDtoOfWarehouseDto = yield service.getList(undefined, 30, 0, undefined);
        yield put(updateState({ list: categorys.items }));
    })

    .takeEvery(get, function* (payload, { put }) {
        let service = new ServiceProxy();
        const category: WarehouseDto = yield service.get(payload.id);
        yield put(updateState({ entity: category }));
    })

    .takeEvery(create, function* (payload, { put }) {
        let service = new ServiceProxy();
        yield service.create(payload);
        yield put(query());
    })

    .takeEvery(update, function* (payload, { put }) {
        let service = new ServiceProxy();
        yield service.update(payload.id, payload);
        yield put(query());
    })

    .takeEvery(deleteAction, function* (payload, { put }) {
        let service = new ServiceProxy();
        yield service.delete(payload.id);
        yield put(query());
    })
    .build();

export default model;
export const actions = {
    updateState: updateState,
    query: query,
    get: get,
    create: create,
    update: update,
    delete: deleteAction
}