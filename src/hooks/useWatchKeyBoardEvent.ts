import { useCallback, useEffect, useMemo } from "react"
import _ from "lodash";

// 一个关于监听全局键盘事件的hook
// 这个方法可以在任何工程里使用, 是抽象出逻辑的单一hook
// targetKeys就是你要传递过来的键位组合, 这应该是一个数组
// 我举几个例子
// 1.我想监听 按键 A 和 B 然后执行一个监听器, 那么你传进来的就是: useWatchKeyBoardEvent(["A", "B"], listener)
// 2. 我想监听 按键ctrl + c 后执行一个监听器, 那么你传进来的应该是一个二维数组： useWatchKeyBoardEvent([["ctrl", "c"]], listener)
// 3. 我详见听 按键 ctrl + z 或者 ctrl + v后执行一个监听器: useWatchKeyBoardEvent([["ctrl", "z"], ["ctrl", "v"]], listener)
function useWatchKeyBoardEvent (targetKeys: Array<string>, listener: (e: KeyboardEvent) => void) {
	const isMac = useMemo<boolean>(() => /macintosh|mac os x/i.test(window.navigator.userAgent), [])
	const keysMap = useMemo<{ [key: string]: number | string }>(() => ({
		"ctrl": isMac ? "metaKey" : "ctrlKey",
		"shift": "shiftKey",
		"alt": "altKey",
		"c": 67,
		"z": 90,
		"y": 89,
		"s": 83,
        "Enter": 13
	}), [isMac])

	// 特殊键位就是不能通过keyCode判断的, 比如 ctrl就是ctrlkey
	const specialKeys = useMemo<["ctrl", "shift", "alt"]>(() => [ "ctrl", "shift", "alt" ], [])
	const isSpecialKey = useCallback<(keyName: string) => boolean>((keyName) => {
		return specialKeys.find(key => key === keyName) ? true : false;
	}, [specialKeys])

	const checkHasTargetKey = useCallback((composeKeyArr, targetKey) => {
		return composeKeyArr.includes(targetKey)
	}, [])

	const executeListener: Function = useCallback((
		composeKeyArr = [], e, callback, fullComposeKeys
	) => {
		if (composeKeyArr.length === 0) {
			// 因为这个是内置函数, 我自己有绝对的控制权, 所以如果用户没有传递composeKeyArr我是不会调用这个函数的

			// 但是这里我其实还要看一个问题, 比如ctrl + z, 那当我们按 ctrl + shift + z的时候就要屏蔽掉
			// 能够到这里来证明他已经完全每个单词都匹配上了, 那我要做的就是检查 ctrl / shift是否为true了
			if (e.altKey && !checkHasTargetKey(fullComposeKeys, "alt")) return
			if (e.shiftKey && !checkHasTargetKey(fullComposeKeys, "shift")) return
			if (e.ctrlKey && !checkHasTargetKey(fullComposeKeys, "ctrl")) return
		    callback(e)
			return
		}
		const _composeKeyArr = _.cloneDeep(composeKeyArr)
		const currentKey = _composeKeyArr.shift() // 拿到第一个key
		if (typeof currentKey === "string") {
			const matchKeySymbol = keysMap[currentKey as any]

			// 我们再确认一下是不是特殊的key
			if (isSpecialKey(currentKey)) {

				// 如果是特殊key, 那么我们直接用e上访问属性来监听
				e[matchKeySymbol] && executeListener(
					_composeKeyArr, e, listener, fullComposeKeys
				)
			} else {
				// 如果不是特殊key, 那么我们就只能通过keyCode来监听
				e.keyCode === matchKeySymbol && executeListener(
					_composeKeyArr, e, listener, fullComposeKeys
				)
			}
		}
	}, [ checkHasTargetKey, isSpecialKey, keysMap, listener ])

	const keydownCallback = useCallback((e) => {
		// 我看一下有没有我的keysMap需要对应的事件
		targetKeys.forEach(key => {
			// key是有可能为字符串的, 如果是字符串的话就等于是监听单个按键, 我们就把他设定为数组
			let _composeKeys: string[] = Array.isArray(key) ? key : [key]
			const fullComposeKeys = _.cloneDeep(_composeKeys)
			executeListener(
				_composeKeys, e, listener, fullComposeKeys
			)
		})

	}, [ targetKeys, executeListener, listener ])

	useEffect(() => {
		document.addEventListener("keydown", keydownCallback)
		return () => document.removeEventListener("keydown", keydownCallback)
	}, [keydownCallback])
}

export default useWatchKeyBoardEvent
