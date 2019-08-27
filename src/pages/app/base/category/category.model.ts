import { DvaModelBuilder, actionCreatorFactory } from 'dva-model-creator';
import { ProductCategoryServiceProxy as ServiceProxy, PagedResultDtoOfProductCategoryDto, ProductCategoryDto } from "ApiService";
const namespace = "category";

export interface CategoryProps {
    list?: ProductCategoryDto[],
    entity?: ProductCategoryDto
}

const actionCreator = actionCreatorFactory(namespace);
const updateState = actionCreator<CategoryProps>('updateState');
const query = actionCreator('query');
const get = actionCreator<{ id: string }>('get');
const create = actionCreator<ProductCategoryDto>('create');
const update = actionCreator<ProductCategoryDto>('update');
const deleteAction = actionCreator<{ id: string }>('delete');

const model = new DvaModelBuilder<CategoryProps>({ list: [] }, namespace)
    .case(updateState, (state, payload) => {
        return { ...state, ...payload };
    })

    .takeEvery(query, function* (payload, { put }) {
        let service = new ServiceProxy();
        const categorys: PagedResultDtoOfProductCategoryDto = yield service.getList(undefined, 30, 0, undefined);
        yield put(updateState({ list: categorys.items }));
    })

    .takeEvery(get, function* (payload, { put }) {
        let service = new ServiceProxy();
        const category: ProductCategoryDto = yield service.get(payload.id);
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